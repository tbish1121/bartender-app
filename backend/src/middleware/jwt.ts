import {Request, Response} from 'express'
const jwt = require('jsonwebtoken');

interface User {
    username: string,
    password: string,
    email: string
}

exports.authenticateToken = (req: Request, res: Response, next: any) => {
    let token = req.headers["x-access-token"];

    if(token) {
        // jwt.verify(token, process.env.SECRET)
        // res.status(200).send({"message": "success"});
        res.send(token)
    } else {
        res.status(400).send("token not present");
    }
}