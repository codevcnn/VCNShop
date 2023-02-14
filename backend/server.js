
import 'dotenv/config'
import app from "./app.js"
import connectDB from '../backend/configs/connectDB.js'

//process error
process.on("uncaughtException", (error) => {
    console.log(">>> UNCAUGHT EXCEPTION !!!")
    console.log(">>> Error >>>", error)
    console.log('>>> Error message >>>', error.message)
    console.log('>>> Error name >>>', error.name)
    process.exit(1)
})

//connect to database
connectDB()

const { PORT } = process.env

const server = app.listen(PORT, () => {
    console.log(`>>> Server is working on http://localhost:${PORT}`)
})