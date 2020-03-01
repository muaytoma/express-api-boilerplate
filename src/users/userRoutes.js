import User from './user';

class UserRoutes{
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }
  
  registerRoutes() {
    this.router.post(
      '/v1/users/register',
      this.register.bind(this)
    );
    this.router.post(
      '/v1/users/login',
      this.login.bind(this)
    );
  
  }
  //register
  async register(req, res, next){
    User.register(req).then((response) => {
      if(response){
        res.render.success(response);
      } else {
        res.render.error(response);
      }
    }).catch(err => {
      res.render.error(err);
    })
  }
  // login on dashboard
  async login(req, res, next) {
    User.login(req.body.email,req.body.password).then((response) => {
      console.log(response)
      res.render.success(response);
    }).catch(err => {
      res.render.error(err);
    })
  }
}

export default UserRoutes;
