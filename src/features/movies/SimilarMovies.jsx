import React, { useState } from 'react'
import MovieCard from './MovieCard'
import useFetchMovies from '../../hooks/useFetchMovies'

const SimilarMovies = (props) => {
    const movieId = props.movieId

    const query = `movie/${movieId}/similar`
    const {movieList:movies, isLoading, errorMessage} = useFetchMovies(query)

  return (
    <div>
        <div
        className='text-lg font-bold'>
            Similar Movies...
        </div>

        <div 
        className='flex gap-[1rem] overflow-x-auto similar-movies'>
            {movies.length>0&&movies.map(movie=>(
                <div key={movie.id}>
                    <MovieCard isWatchlist={false} movie={movie}/>
                </div>
            ))   
            }
        </div>
    </div>
  )
}

export default SimilarMovies