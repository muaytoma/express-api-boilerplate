import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import config from '../environment';

const PATH_NOT_AUTHEN = [
  '/api/v1/users/login',
  '/api/v1/users/register',
  '/info'
];

const applyMiddleware = app => {
  app.use(expressJwt({
      secret: config.secretKey.accessToken
    }).unless({path: PATH_NOT_AUTHEN})
  );
  
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });
};

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    let temp = token.split(" ");
    jwt.verify(temp[1], config.secretKey.accessToken, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        // v2 check on blacklist
        // v1 return user id
        resolve(decoded.id);
      }
    });
  });
};

export default {
  applyMiddleware : applyMiddleware,
  verifyToken: verifyToken
};
