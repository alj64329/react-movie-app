import React, { useEffect, useState } from 'react'
import { genres } from '../constant/genre'
import GridDisplay from '../features/movies/GridDisplay'
import {MovieByCategory } from '../features/Browse/MovieByCategory'
import MovieCard from '../features/movies/MovieCard'

const BrowsePage = () => {
    const [genreId, setGenreId] = useState(null)
    const [end, setEnd ]= useState(`discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`)

    useEffect(()=>{
        const base= `discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`
        const query = genreId? `${base}&with_genres=${genreId}`:base
        setEnd(query)
    },[genreId])

  return (
    <div className='px-[4rem]'>
        
        <div className='pt-[4rem] md:pt-[2rem]'>
            <ul className='flex gap-[1rem] overflow-x-auto max-w-[1000px] mx-auto'>
            {genres.genres.map(genre =>
                <li key={genre.id}
                genreid = {genre.id} 
                className='cursor-pointer'
                onClick={(e)=>setGenreId(genre.id)}>{genre.name}</li>
            )}
            </ul>
        </div>
        <MovieByCategory query={end}/>
    </div>
  )
}

export default BrowsePage