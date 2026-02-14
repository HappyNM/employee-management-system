import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import connectToDatabase from './db/db.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'

connectToDatabase()


const app = express()
app.use(cors({
    origin: "https://employee-front-chi.vercel.app",
    credentials: true
})
    
)
app.use(express.json())
app.use('/public/uploads', express.static('public/uploads'))
app.use("/api/auth", authRouter)
app.use("/api/department", departmentRouter)
app.use("/api/employee", employeeRouter)
app.use("/api/salary", salaryRouter)
app.use("/api/leave", leaveRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT} `);
    
})
