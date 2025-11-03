import React from 'react'

const ErrorModal = ({isOpen, onClose, message}) => {

    if (!isOpen) return null
    
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-gray-700 text-white rounded-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick ={onClose}
        >✕</button>
        <div>
            <div className='font-bold text-red-800 text-center py-[2rem] text-[14px]'
            style={{whiteSpace:'pre-line'}}>
                {message}
            </div>
        </div>
      </div>
    </div>
  )

}

export default ErrorModal