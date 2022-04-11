import express, { Application } from 'express';
import {gitListRouter} from './router/git'
import {runArticle} from "./router/article";
const app: Application = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next();
});

app.use('/list', gitListRouter)
app.use('/article', runArticle)

app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});