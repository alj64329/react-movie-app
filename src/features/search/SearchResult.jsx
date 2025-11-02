import React from 'react'
import useFetchMovies from '../../hooks/useFetchMovies'
import Spinner from '../../components/Spinner'
import MovieCard from '../movies/MovieCard'

const SearchResult = (props) => {
    const {movieList:movies, isLoading, errorMessage} = useFetchMovies(props.query)


  return (
    <div className="pt-[4rem] md:pt-[3rem] max-w-[1800px]">
        <h2 className='uppercase heading-font text-3xl px-[4rem]'>{props.title}</h2>
      <div className='flex justify-center'>
        {
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 max-w-[1200px]'>
            {isLoading?<Spinner/>:movies.length>0?movies.map(list=>(
                <MovieCard movie={list} isWatchList={false} key={list.movieId}/>
            )):"No Result"}
        </div>
      }
        </div>
    </div>
  )
}

export default SearchResult 
