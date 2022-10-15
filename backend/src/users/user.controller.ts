import {Request, Response} from 'express'
const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Test route
exports.getAllUsers = async(req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: {
            earnings: true
        }
    });

    res.json(users)
}

//Create user
exports.register = async(req: Request, res: Response) => {
    const {username, email, password} = req.body;

    if (!(email && username && password)) {
        res.status(400).send("All input is required");
      }

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

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
                password: hashedPassword,
                email: email
            }
        })

        const userWithToken = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                token: jwt.sign(
                    {userId: user.id},
                    process.env.SECRET,
                    {expiresIn: "2h"}
                )
            }
        })
    
        res.json(userWithToken);
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
