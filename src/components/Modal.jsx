import React from 'react'
import AuthoForm from './AuthForm'

const Modal = ({isOpen, onClose, setUser}) => {
    if (!isOpen) return null
    
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick ={onClose}
        >✕</button>
        < AuthoForm onClose={onClose} />
      </div>
    </div>
  )
}

export default Modal