import React from 'react'

const VideoModal = (props) => {
  const {isOpen, onClose, video} = props
    if (!isOpen) return null
  
  const videoKey = video.key
  const youtubeUrl = `https://www.youtube.com/embed/${videoKey}`
    
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick ={onClose}
        >✕</button>

        <div className='h-[100%]'>
          <iframe src={youtubeUrl} width={'100%'} height={'100%'} allowFullScreen></iframe>
        </div>


      </div>
    </div>

  )
}

export default VideoModal