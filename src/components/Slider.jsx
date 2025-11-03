import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { genres } from '../constant/genre'
import { imgBase } from '../constant/constant'

const Slider = ({movie}) => {
    const [isHover, setIsHover]=useState(false)
    const path = movie.backdrop_path
    const navigate = useNavigate()

    const genreIds = genres["genres"].filter((genre)=>movie.genre_ids.includes(genre["id"]))
    const genreNames = genreIds.map((item)=>item.name)

  return (
    <div className='relative pt-[2rem] md:pt-0'
        onClick={()=>navigate(`/movie/${movie.id}`,{state:{movie}})}
        onMouseEnter={()=>setIsHover(true)}
        onMouseLeave={()=>setIsHover(false)}>
        {path?
        <img
        src={`${imgBase}${path}`} 
        className='hero-cover w-full overlay-mask'/>:
        <div className='hero-cover w-full overlay-mask'></div>}

        <div className='absolute text-white bottom-[25%] right-[50%] translate-x-[50%]'>
            <div className='md:w-max-[500px] flex flex-col items-center cursor-pointer'
            onClick={()=>navigate(`/movie/${movie.id}`,{state:{movie}})}>
                <h3 className='text-3xl font-bold'>{movie.title}</h3>
                <div className='flex gap-3'>
                    <div>{movie.release_date.slice(0,4)}</div>
                    <div>
                        {genreNames.map((item, index)=>
                        <span key={index} >{item}{index!== genreNames.length-1?"/":""}</span>)}
                    </div>
                </div>
                {isHover&&<div className='hidden md:block'>{movie.overview}</div>
                }
            </div>
        </div>
    </div>
  )
}

export default Slider