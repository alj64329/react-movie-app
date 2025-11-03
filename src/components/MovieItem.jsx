
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as faBookmarkSolid} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { addWatchList, isInWatchList, removeWatchList } from '../features/watchlist/watchList'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { imgBase } from '../constant/constant'

  const MovieItem = (props) => {
    const {loggedInUser, setLoggedInUser,watchList,setWatchList} = useContext(UserContext)
    const [isHovered, setIsHovered] = useState(false)
    const [isBookmarked, setIsBookmarked] =useState(false)
    const navigate = useNavigate()

    const movie = props.movie
    useEffect(()=>{
      const isInList = isInWatchList(movie, watchList)
      setIsBookmarked(isInList)
    },[movie, watchList])


    const bookmarkFn = ()=>{
      setIsBookmarked(!isBookmarked)
      const row = watchList.find((el)=>el.movieId === movie.id)
      if(row){
        const rowId = row.$id
        removeWatchList(rowId)
      }else{
        addWatchList(loggedInUser,movie)
      }
    }
  return (
    <div className='relative' 
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)}
    >
      <img
      src={`${imgBase}${movie.backdrop_path}`} 
      className='max-w-[280px] rounded-md'
      style={{filter: isHovered? 'grayscale(70%)': 'grayscale(0)'}}/>
      {loggedInUser&&<div className='absolute top-[15px] right-[20px] text-white'
      style={{display:isHovered?'block':'none'}}
      onClick={()=>bookmarkFn()}>
        {isBookmarked?
        <FontAwesomeIcon icon={faBookmarkSolid} className='text-xl' />:<FontAwesomeIcon icon={faBookmarkRegular} className='text-xl'/>}
      </div>}
      <div 
      className='absolute w-[200px] h-[150px] cursor-pointer left-1/2 -translate-x-1/2 top-0'
      onClick={()=>navigate(`/movie/${movie.id}`,{state:{movie}})}>
      </div>
      <div className='absolute bottom-5 left-5 text-[#FAF679] cursor-pointer font-bold'
      style={{display:isHovered?'block':'none'}}
      onClick={()=>navigate(`/movie/${movie.id}`,{state:{movie}})}>
        {movie.title}
      </div>
    </div>
  )
}

export default MovieItem