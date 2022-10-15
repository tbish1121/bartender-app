import {Request, Response} from 'express';
const prisma = require('../config/db');

exports.createEarning = async(req: Request, res: Response) => {
    const {amount} = req.body;
    const userId = parseInt(req.params.id)

    const earning = await prisma.earnings.create({
        data: {
            amount: amount,
            user: {
                connect: {
                    id: userId 
                }
            }
        }
    })

    res.json(earning)

}