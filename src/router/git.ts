import express, { Request, Response } from 'express';
import { readFileSync } from 'fs';

const router = express.Router();

export const gitListRouter = router
  .get('/', (req: Request, res: Response) => {
    try {
      const data = readFileSync(`${process.cwd()}/json/list.json`, 'utf8');
      res.json({
        code: 'success',
        data: JSON.parse(data)
      });
    } catch (err) {
      res.json({
        code: 'error',
        data: err
      });
    }
  })
  .get('/:id', (req: Request, res: Response) => {
    try {
      const data = readFileSync(`${process.cwd()}/json/${req.params.id}.json`, 'utf8');
      res.json({
        code: 'success',
        data: JSON.parse(data)
      });
    } catch (err) {
      res.json({
        code: 'error',
        data: err
      });
    }
  });
