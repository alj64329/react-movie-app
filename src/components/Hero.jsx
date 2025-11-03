import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { genres } from '../constant/genre'
import { useNavigate } from 'react-router-dom'
import { imgBase } from '../constant/constant'
import Slider from './Slider'
import { useMemo } from 'react'


const Hero = (props) => {
    //Need to pass the movie with drop_path
    // const index = Math.floor(Math.random()*props.movies.length)
    // const path = props.movies[index].backdrop_path
    //useMemo, this will run only when props.movies have changed
    const movies = useMemo(()=>{
        return [...props.movies].sort(()=>Math.random()-0.5).slice(0,5)
    }, [props.movies]) 

    const [current, setCurrent] = useState(0)
    const[isPaused, setIsPaused] = useState(false)
    const interval = 5000

    useEffect(()=>{
        if(isPaused) return

        const timer = setTimeout(()=>{
            setCurrent((prev)=>(prev== movies.length-1 ? 0: prev+1))
        },interval)

        return()=> clearTimeout(timer)
    },[current, isPaused, movies.length, interval])


    function goToSlide(index) {
        setCurrent(index);
    }


  return (
        <div>
            <div
            onMouseEnter={()=>setIsPaused(true)}
            onMouseLeave={()=>setIsPaused(false)}
            >
                {movies.map((movie,index)=>(
                    <div
                    key={movie.id}
                    className={`slide ${index === current ?"active":"hidden"}`}>
                        <Slider movie={movie} />
                    </div>
                ))}
            </div>
            <div className="dots flex justify-center">
                {movies.map((_, idx) => (
                <span
                    key={idx}
                    className={`dot ${idx === current ? "active" : ""}`}
                    onClick={() => goToSlide(idx)}
                />
                ))}
        </div>
    </div>
  )
}

export default Hero