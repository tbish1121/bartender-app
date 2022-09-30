import {Request, Response} from 'express'
const prisma = require('../config/db');

//Test route
exports.getAllUsers = async(req: Request, res: Response) => {
    const users = await prisma.user.findMany();

    res.json(users)
}

//Create user
exports.register = async(req: Request, res: Response) => {
    const {username, email, password} = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (existingUser) {
        res.send({"message": "User already exists"});
    } else {
        const user = await prisma.user.create({
            data: {
                username: username,
                password: password,
                email: email
            }
        })
    
        res.json(user);
    }
}

exports.updatePassword = async(req: Request, res: Response) => {
    const {username, password, email} = req.body;
    const id = parseInt(req.params.id)

    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            username: username,
            password: password,
            email: email
        }
    })

    res.json(user)

}

exports.getUserByID = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    res.json(user)
}
