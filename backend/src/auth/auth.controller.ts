import {Request, Response} from 'express'
const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.logIn = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (bcrypt.compareSync(password, user.password)) {
        
        res.send({"message": "success"})
    } else {
        res.send({"message": "incorrect login info"})
    }

    

    
    
    
}