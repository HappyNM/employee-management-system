import  jwt  from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
const login = async(req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({success: false, error: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({success: false, error: "Invalid credentials"})
        }
        const token = jwt.sign({_id: user._id, role: user.role},
            process.env.JWT_KEY, {expiresIn: "10d"}
        )
        res.status(200).json({success: true, token, user:{_id:user._id, name: user.name, role:user.role}})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, error: error.message})
        
    }
}
const verify = (req, res) => {
    return res.status(200).json({success: true, user: req.user})
}
const changePassword = async (req, res) => {
    try {
        const userId = req.user?._id
        const { currentPassword, newPassword } = req.body
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, error: 'Current and new password are required' })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' })
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Current password is incorrect' })
        }

        const hashed = await bcrypt.hash(newPassword, 10)
        user.password = hashed
        await user.save()

        return res.status(200).json({ success: true, message: 'Password changed successfully' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, error: 'Server error while changing password' })
    }
}
export {login, verify, changePassword}