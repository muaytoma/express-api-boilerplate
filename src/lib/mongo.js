import { MongoClient,ObjectId } from 'mongodb';
import CONFIG from '../../environment'

class Mongo {
  constructor() {
    this.connecting = this.init();
  }
  async init(){
    const uri = CONFIG.mongo.URI;
    const dbName = CONFIG.mongo.DATABASE;
    const options = { useNewUrlParser: true };
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri ,options , function(err, database){
        let connected = database.db(dbName);
        resolve(connected);
      })
    });
  }
  
  async insert(params){
    let collectionName = this.getCollectionName;
    return new Promise((resolve, reject) => {
      this.connecting
        .then(
          function (database) {
            return database.collection(collectionName).insertOne(params)
          })
        .then(function (value) {
          resolve(value.result);
        }).catch(function (err) {
          reject(err);
        })
    });
  }
  async find(params){
    let collectionName = this.getCollectionName;
    return new Promise((resolve, reject) => {
      this.connecting
        .then(
        function (database) {
          return database.collection(collectionName).findOne(
            params
          )
        })
        .then(function (value) {
          resolve(value);
        }).catch(function (err) {
          console.log(err.message);
        reject(err);
      })
    });
  }
  // return data of matched , optional :{"templates.$" : 1}
  async findByKey(params,optional){
    let collectionName = this.getCollectionName;
    return new Promise((resolve, reject) => {
      this.connecting
        .then(
          function (database) {
            return database.collection(collectionName).find(
              params,
              optional
            )
          })
        .then(function (value) {
          resolve(value);
        }).catch(function (err) {
        console.log(err.message);
        reject(err);
      })
    });
  }
  
  //Filter params and then cast data to object and upsert
  async updateById(data, params){
    let collectionName = this.getCollectionName;
    return new Promise((resolve, reject) => {
      this.connecting
        .then(
          function (database) {
            return database.collection(collectionName).findOneAndUpdate(params,
              { $set: data },
              {
                returnOriginal:false,
                upsert: true
              }
            )
          })
        .then(function (value) {
          resolve(value);
        }).catch(function (err) {
        console.log(err.message);
        reject(err);
      })
    });
  }
  
  //Filter params and then cast data to array and upsert
  async update(data, params){
    let collectionName = this.getCollectionName;
    return new Promise((resolve, reject) => {
      this.connecting
        .then(
          function (database) {
            return database.collection(collectionName).findOneAndUpdate(params,
              { $addToSet: data },
              {
                returnOriginal:false,
                upsert: true
              }
            )
          })
        .then(function (value) {
          resolve(value);
        }).catch(function (err) {
        console.log(err.message);
        reject(err);
      })
    });
  }
  
  async delete(data, params){
    let collectionName = this.getCollectionName;
    return new Promise((resolve, reject) => {
      this.connecting
        .then(
          function (database) {
            return database.collection(collectionName).findOneAndUpdate(params,
              { $pull: data }
            )
          })
        .then(function (value) {
          resolve(value);
        }).catch(function (err) {
        console.log(err.message);
        reject(err);
      })
    });
  }
  
  async upsertByFilter(data, params, filter){
    let collectionName = this.getCollectionName;
    return new Promise((resolve, reject) => {
      this.connecting
        .then(
          function (database) {
            return database.collection(collectionName).findOneAndUpdate(params,
              { $addToSet: data },
              {
                arrayFilters:filter,
                upsert: true
              }
            )
          })
        .then(function (value) {
          resolve(value);
        }).catch(function (err) {
          console.log(err.message);
          reject(err);
      })
    });
  }
  
  async updateByFilter(data, params, filter){
    let collectionName = this.getCollectionName;
    return new Promise((resolve, reject) => {
      this.connecting
        .then(
          function (database) {
            return database.collection(collectionName).findOneAndUpdate(params,
              { $set: data },
              {
                arrayFilters:filter,
                returnOriginal: false,
                upsert: true
              }
            )
          })
        .then(function (value) {
          resolve(value);
        }).catch(function (err) {
        console.log(err.message);
        reject(err);
      })
    });
  }
  
  getObjectId(id){
    return ObjectId(id);
  }
  
  set setCollectionName(collectionName){
    this._collectionName = collectionName;
  }
  
  get getCollectionName(){
    return this._collectionName;
  }
}

export default new Mongo();
