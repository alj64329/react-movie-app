import React, { useEffect, useState } from 'react'
import useFetchMovies from '../../hooks/useFetchMovies'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router-dom'
import MovieCard from '../movies/MovieCard'

const ShowMovies = (props) => {
  const end = props.query
  const [picks, setPicks]= useState([])
  const {movieList, isLoading, errorMessage} = useFetchMovies(end)

  useEffect(()=>{
    if(movieList && movieList.length>0){
      const shuffled = movieList.sort(()=>0.5-Math.random())
      setPicks(shuffled.slice(0,3))
    }
  },[movieList])

  return (
    <div className='px-[2rem]'>
      <div className='text-center p-[2rem] heading-font text-4xl'>
        3 Picked Movies
      </div>
      <div 
      className='pick-results picks-border'>
        {isLoading?<Spinner/>:
        picks.map(pick=>(
          <div key={pick.id}>
          <MovieCard movie={pick} isWatchList={false}/>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default ShowMovies