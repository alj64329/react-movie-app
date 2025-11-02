import React, { useEffect, useState } from 'react'
import useFetchMovies from '../../hooks/useFetchMovies'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'


export const MovieByCategory = (props) => {
    const navigate = useNavigate()
    const [page, setPage]= useState(1)
    const [movieList, setMovieList] = useState([])
    const {movieList:movies, isLoading, errorMessage} = useFetchMovies(`${props.query}&page=${page}`)
    const imgBase = "https://image.tmdb.org/t/p/original"

    useEffect(()=>{
      setMovieList(movies)
    }, [movies])

    
  return (
    <div className="pt-[1rem] md:pt-[2rem] max-w-[1800px]">
      <div className='flex justify-center'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 max-w-[1200px]'>
          {
          isLoading? (<Spinner/>):errorMessage?(<p>{errorMessage}</p>):
          movieList.map(movie=>
              <div key={movie.id} className="p-[1rem] cursor-pointer" onClick={()=>navigate(`/movie/${movie.id}`,{state:{movie}})}>
              <img src={`${imgBase}${movie.poster_path}`} className='w-[180px] rounded-lg'/>
              <div></div>
            </div>
          )
          }
        </div>
      </div>
      <div className="py-[2rem] flex justify-between">
        <button className={page===1?"text-[rgba(0,0,0,0.4)]":"cursor-pointer"} onClick={()=>setPage(page-1)}>Previous</button>
        <button className ="cursor-pointer" onClick={()=>setPage(page+1)}>Next</button>
      </div>
    </div>
  )
}
