import express, { Request, Response, NextFunction } from 'express';
import {markedFunction} from "../util/git";
import {readFileSync} from "fs";

const router = express.Router();

export const gitListRouter =router.get('/', (req: Request, res: Response, next: NextFunction) => {
    const data = readFileSync(`${process.cwd()}/json/list.json`, 'utf8')
    res.json({
        code: "success",
        data: JSON.parse(data)
    })
}).get('/marked', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await markedFunction(`${process.cwd()}/markdown`);
        res.json({
            code: 'success',
            data: true
        })
    } catch (err) {
        res.json({
            code: 'success',
            data: err
        })
    }
}).get('/:id', (req: Request, res: Response, next: NextFunction) => {
    const data = readFileSync(`${process.cwd()}/json/${req.params.id}.json`, 'utf8')
    res.json({
        code: "success",
        data: JSON.parse(data)
    })
})
