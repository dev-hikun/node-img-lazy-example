import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

const app = express();
const _path = path.join(__dirname, '../dist');

app.use('/', express.static(_path));

app.listen('1234', () => {
    console.log(`
  ################################################
  🛡️  Lazy Image Server listening on port: 1234🛡️
  ################################################
`);
});