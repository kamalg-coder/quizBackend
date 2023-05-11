const express=require('express')
const cors=require('cors')
const { userRouter } = require('./routers/User.router')
const { connection } = require('./config/db')
const { quizRouter } = require('./routers/Quiz.router')
const { leaderRouter } = require('./routers/LeaderBoard.router')

const app=express()

require('dotenv').config()

const port=process.env.port

app.use(express.json())

app.use(cors())

app.get('/',(req,res)=>{
    res.send('HomePage')
})

app.use('/',userRouter)
app.use('/',quizRouter)
app.use('/',leaderRouter)

app.listen(port,async()=>{
    try {
        await connection
        console.log('Connected to database')
    } catch (error) {
        console.log('Cannot connected to DB')
    console.log(error)
    }
    console.log(`Server is listened at ${port}`)
})