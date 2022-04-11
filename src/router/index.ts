import express, { Request, Response } from 'express';

const router = express.Router();

export const indexHtml = router.get('/', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html');
  res.render('./../views/index.html');
});
