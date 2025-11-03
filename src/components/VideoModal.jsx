import React from 'react'

const VideoModal = (props) => {
  const {isOpen, onClose, video} = props
    if (!isOpen) return null
  
  const videoKey = video.key
  const youtubeUrl = `https://www.youtube.com/embed/${videoKey}`
    
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-2xl w-full max-w-3xl relative p-4">
        <div className='flex justify-end px-1 pb-[0.4rem] md:pb-[1rem]'>
          <button
            className="text-gray-400 hover:text-white md:text-xl"
            onClick ={onClose}
          >✕
          </button>
        </div>

        <div className="w-full aspect-video overflow-hidden">
          <iframe 
            src={youtubeUrl}  
            className='w-full h-full'
            allowFullScreen></iframe>
        </div>


      </div>
    </div>

  )
}

export default VideoModal