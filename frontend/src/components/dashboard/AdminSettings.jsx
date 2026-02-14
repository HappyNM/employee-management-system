import React, { useState } from 'react'
import axios from 'axios'

const AdminSettings = () => {
     const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    if (!form.currentPassword || !form.newPassword || !form.confirmNewPassword) {
      setError('Please fill in all fields')
      return
    }
    if (form.newPassword !== form.confirmNewPassword) {
      setError('New passwords do not match')
      return
    }
    if (form.newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }

    try {
      setSubmitting(true)
      const res = await axios.post('https://employee-server-pink.vercel.app/api/auth/change-password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (res.data.success) {
        setMessage('Password updated successfully')
        setForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' })
      }
    } catch (err) {
      const apiError = err?.response?.data?.error || 'Failed to change password'
      setError(apiError)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className='max-w-xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Change Password</h2>
      {message && <div className='mb-4 p-3 rounded bg-green-50 text-green-700'>{message}</div>}
      {error && <div className='mb-4 p-3 rounded bg-red-50 text-red-700'>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Current Password</label>
            <input
              type='password'
              name='currentPassword'
              value={form.currentPassword}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>New Password</label>
            <input
              type='password'
              name='newPassword'
              value={form.newPassword}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Confirm New Password</label>
            <input
              type='password'
              name='confirmNewPassword'
              value={form.confirmNewPassword}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div>
            <button
              type='submit'
              disabled={submitting}
              className={`w-full mt-2 ${submitting ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700'} text-white font-semibold px-4 py-3 rounded-md transition-colors`}
            >
              {submitting ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminSettings
