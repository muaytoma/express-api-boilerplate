# EXPRESS-API-BOILERPLATE
This demo is created for reduce time developers who want to create API. 
It also has library to help developers to connect firebase and MongoDB.

## Usage
Register route on src/routes.js

```javascript
new UserRoutes(router);
```

Define route url to avoid authorization with Bearer Token
on src/lib/helper.js

```javascript
const PATH_NOT_AUTHEN = [
  '/api/v1/users/login',
  '/api/v1/users/register',
  '/info'
];
```

## Setup

```sh
# install dependencies
npm install # or yarn

# on local
npm run local

# run test code
npm run test 

# build for production
npm run build

```



