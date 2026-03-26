import axios from "axios";
import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const response= await axios.post("https://employee-server-pink.vercel.app/api/auth/login", {email, password});
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
            if(response.data.user.role === "admin"){
                    navigate("/admin-dashboard")
            } else{
                navigate("/employee-dashboard")
            }
            };
        } catch (error) {
            if(error.response && error.response.data.success === false){
                setError(error.response.data.error)
            }else{
                setError("An unexpected error occurred. Please try again later.");
                
            }
            
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-600 from-30% via-teal-500 via-40% to-gray-400 to-70%">
            <div className="text-center mb-6 sm:mb-8 w-full">
                <h2 className="font-pacific text-3xl sm:text-4xl lg:text-5xl text-white mb-2 animate-pulse break-words">Employee Management System</h2>
                <p className="text-sm sm:text-base text-teal-100">Welcome back! Please sign in to continue.</p>
            </div>
            {error && <div className="mb-4 text-red-600 font-medium text-sm sm:text-base">{error}</div>}
            <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-sm md:max-w-md">
                <h2 className="font-bold text-2xl sm:text-3xl mb-6 text-center text-gray-800">Login</h2>
                <form className="flex flex-col gap-4 sm:gap-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Email</label>
                        <div className="relative">
                            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type="email" placeholder="Enter your email" className="w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                            onChange={(e)=>setEmail(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Password</label>
                        <div className="relative">
                            <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type="password" placeholder="Enter your password" required className="w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                            onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-teal-600 transition duration-150 ease-in-out" />
                            <span className="ml-2 text-gray-700 text-sm sm:text-base">Remember Me</span>
                        </label>
                        <a href="#" className="text-teal-600 hover:text-teal-800 transition-colors duration-200 text-sm sm:text-base">Forgot Password?</a>
                    </div>
                    <button type="submit" className="w-full bg-teal-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-teal-700 active:bg-teal-800 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login
