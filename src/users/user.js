import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from '../environment';
import Helper from "../lib/helper";
import TestData from '../data/test'

class User{
  
  constructor(){
  }

  async verifyClient(authorization){
    try{
      let user =  await Helper.verifyToken(authorization);
      if(!user) {
        return  {'code': 404, 'message': 'No user found.'}; 
      }
      return {'code': 200};
    } catch (err) {
      throw (err)
    }
  }

  async login(email,password) {
    try{
      //grab user by email first
      const user = TestData.users.filter((user) => {
        return user.email == email
      })


      if(Array.isArray(user) && user.length === 0 ) return Promise.reject({respCode: 404 , message: 'User not found'});

      //if so compare the pwd that client post with hash pwd that we store in test data
      if(!bcrypt.compareSync(password,user[0].password)) return Promise.reject({respCode: 404 , message: 'Password is not mismatch'});

      //return client token for authentication when request API 
      let clientToken = jwt.sign({ id: user[0].clientId }, config.secretKey.accessToken, {
        expiresIn: 86400 // expires in 24 hours
      });
    
      return {
        'clientName' : user[0].clientName ,
        'clientToken' : clientToken ,
      }
      
    }catch(err){
      throw (err)
    }
  }
  //register
  async register(req) {

    const user = TestData.users.filter((user) => {
      return user.email == req.body.email
    })

    if(Array.isArray(user) && user.length > 0) return Promise.reject({respCode: 404 , message: 'This email address is already used'});

    //Is User Exist then store the data to DB
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let params = {
        clientName:req.body.clientName,
        email: req.body.email,
        password: hashedPassword,
        createdAt: new Date()
    };

    return {'code': 200 , 'user' : req.body.email };
  }
}

export default new User();
