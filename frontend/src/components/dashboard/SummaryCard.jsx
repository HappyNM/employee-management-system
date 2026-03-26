import React from 'react'

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row border border-gray-100'>
      <div className={`flex flex-col justify-center items-center ${color} text-white px-4 sm:px-6 py-6 sm:py-8 min-w-max`}>
        <div className='text-2xl sm:text-3xl'>{icon}</div>
      </div>
      <div className='flex-1 flex flex-col justify-center px-4 sm:pl-6 sm:pr-4 py-4 sm:py-4'>
        <p className='text-xs sm:text-sm font-medium text-gray-600 mb-1'>{text}</p>
        <p className='text-xl sm:text-2xl font-bold text-gray-900'>{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard