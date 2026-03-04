import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import connectToDatabase from './db/db.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'

const app = express()

// CORS and JSON parsing first
app.use(cors({
    origin: "https://employee-front-chi.vercel.app",
    credentials: true
}))
app.use(express.json())
app.use('/public/uploads', express.static('public/uploads'))

// Database connection middleware
app.use(async (req, res, next) => {
    try {
        await connectToDatabase()
        next()
    } catch (error) {
        console.log("DB Connection Error:", error.message)
        res.status(500).json({ success: false, error: "Database connection failed" })
    }
})

// Routes
app.use("/api/auth", authRouter)
app.use("/api/department", departmentRouter)
app.use("/api/employee", employeeRouter)
app.use("/api/salary", salaryRouter)
app.use("/api/leave", leaveRouter)

app.get('/', (req, res) => {
    res.send("Server is Running");
})

export default app
