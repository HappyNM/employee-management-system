import 'dotenv/config'

import bcrypt from 'bcrypt'
import connectToDatabase from '../db/db.js'
import User from '../models/User.js'

const args = process.argv.slice(2)
const emailArgIndex = args.findIndex((value) => value === '--email')
const passwordArgIndex = args.findIndex((value) => value === '--password')

const email = emailArgIndex >= 0 ? args[emailArgIndex + 1] : null
const newPassword = passwordArgIndex >= 0 ? args[passwordArgIndex + 1] : null

if (!email || !newPassword) {
  console.error('Usage: node scripts/resetAdminPassword.js --email <email> --password <newPassword>')
  process.exit(1)
}

const resetPassword = async () => {
  await connectToDatabase()

  const user = await User.findOne({ email })
  if (!user) {
    console.error(`User not found for email: ${email}`)
    process.exit(1)
  }

  const hashed = await bcrypt.hash(newPassword, 10)
  user.password = hashed
  await user.save()

  console.log(`Password updated for ${email}`)
  process.exit(0)
}

resetPassword().catch((error) => {
  console.error('Failed to reset password:', error)
  process.exit(1)
})
