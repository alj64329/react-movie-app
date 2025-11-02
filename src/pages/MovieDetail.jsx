import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { genres } from '../constant/genre'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import VideoModal from '../components/VideoModal'
import useFetchVideo from '../hooks/useFetchVideo'
import { addWatchList, isInWatchList, removeWatchList } from '../features/watchlist/watchList'
import { UserContext } from '../context/UserContext'
import useFetchMovieById from '../hooks/useFetchMovieById'

const MovieDetail = () => {
    //If the movie page is redirect from watchlist, then movie does not have all detail
    const {loggedInUser, watchList} = useContext(UserContext)
    const [isVideoOpen, setVidewatchListoOpen] = useState(false)
    const [isBookmarked, setIsBookmarked] =useState(false)
    const {id} = useParams()
    const {state} = useLocation()
    const movie = state.movie
    console.log(movie)

    const imgBase = "https://image.tmdb.org/t/p/original"

    const genreIds = genres["genres"].filter((genre)=>movie.genre_ids.includes(genre["id"]))
    const genreNames = genreIds.map((item)=>item.name)

    const releasedYear = movie.release_date.split("-")[0]

    const {video, isLoading, errorMessage} = useFetchVideo(id)

    useEffect(()=>{
        const isInList = isInWatchList(movie, watchList)
        setIsBookmarked(isInList)
    },[watchList])

    const bookmarkFn = ()=>{
        setIsBookmarked(!isBookmarked)
        addWatchList(loggedInUser,movie)
    }

    const removeBookmark =()=>{
        setIsBookmarked(false)
        const row = watchList.find((item)=> item.movieId === movie.id)
        console.log(row.$id)
        removeWatchList(row.$id)
    }


  return (
    <div className="pt-[4rem] py-[2rem] px-[1rem] max-w-[1800px]">

        <div className='flex gap-[3rem] md:gap-[5rem] justify-center'>
            <div>
                <img src={`${imgBase}${movie.poster_path}`} 
                className='w-[150px] md:w-[250px]'/>
            </div>
            <div className='max-w-[50%] flex flex-col justify-between'>
                <div className='flex flex-col gap-[0.5rem]'>
                    <div className='font-bold'>{movie.title}
                        <span className='pl-[0.5rem]'>({releasedYear})</span>
                    </div>
                    <div><FontAwesomeIcon icon={faStar}/>{movie.vote_average.toFixed(2)}</div>
                    <div>{genreNames.map((item, index)=>
                        <span key={index} >{item}{index!== genreNames.length-1?" /":""}</span>)}</div>
                </div>
                <div className='flex flex-col lg:flex-row gap-3 text-sm md:text-md font-bold'>
                    {video&&
                    <div className='border-btn-center' onClick={()=>setVidewatchListoOpen(true)}>
                        <span>Watch Trailer </span><FontAwesomeIcon icon={faPlay}/></div>}
                    <div className='border-btn-center cursor-pointer'>
                    {!isBookmarked?
                        <div onClick={()=>bookmarkFn()}>
                            <span>
                                Add to Watchlist
                            </span><FontAwesomeIcon icon={faPlus}/></div>:
                        <div onClick={()=>removeBookmark()}>Remove from Watchlist</div>}
                    </div>
                </div>
            </div>
        </div>
        <div className='py-[2rem] px-[2rem] max-w-[900px] md:px-[4rem] md:mx-auto'>
            <span className='font-bold pr-[0.8rem]'>Overview:</span>
            {movie.overview}
        </div>
        {/* video Modal */}
        {isVideoOpen&&<VideoModal isOpen={isVideoOpen} onClose={()=>setVidewatchListoOpen()} video={video}/>}
        
    </div>
  )
}

export default MovieDetail