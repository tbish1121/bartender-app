import {Request, Response} from 'express'
const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())

app.use('/auth', require('./auth/auth.routes'));
app.use('/users', require('./users/user.routes'));
app.use('/earnings', require('./earnings/earnings.routes'));
app.get('/', (req: Request, res: Response) => {
    res.send("Worked");
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

