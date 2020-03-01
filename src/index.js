import express from 'express';
import bodyParser from 'body-parser';
import Response from './lib/response';
import Helper from "./lib/helper";

import apiRouter from './routes';

const port = process.env.PORT || 3001;

const app = express();

Helper.applyMiddleware(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization'
  );
  res.render = new Response(res);
  next();
});

app.use(['/info'], function(req, res) {
  res.render.success('Hello World');
});

app.use('/api', apiRouter);

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

module.exports = app
