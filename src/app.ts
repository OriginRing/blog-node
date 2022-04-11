import express, { Application } from 'express';
import { gitListRouter } from './router/git';
import { runArticle } from './router/article';
import { indexHtml } from './router';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import * as path from 'path';

const app: Application = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', indexHtml);

app.use('/list', gitListRouter);
app.use('/article', runArticle);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});
