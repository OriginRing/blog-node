import express from "express";
import {markedFunction} from "../util/git";

const router = express.Router();

export const runArticle = router.get('/', async (req, res)=>{
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
})