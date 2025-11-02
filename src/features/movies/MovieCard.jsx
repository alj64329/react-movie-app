import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as faBookmarkSolid} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { addWatchList, isInWatchList, removeWatchList } from '../watchlist/watchList'
import { UserContext } from '../../context/UserContext'
import { faHeart, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { imgBase } from '../../constant/constant'
import { useNavigate } from 'react-router-dom'

const MovieCard = (props) => {
  const {loggedInUser,watchList,setWatchList} = useContext(UserContext)
  const [isHovered, setIsHovered] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const isWatchList = props.isWatchList
  const movie = props.movie
   const navigate = useNavigate()

    const remove = ()=>{
      removeWatchList(movie.$id)
      setWatchList(prev=>prev.filter(item => item.movieId !== movie.movieId))
    }

    useEffect(()=>{
      const isInList = isInWatchList(movie, watchList)
      setIsBookmarked(isInList)
    },[movie, watchList])


    const bookmarkFn = ()=>{
      setIsBookmarked(!isBookmarked)
      const row = watchList.find((el)=>el.movieId === movie.id)
      if(row){
        remove()
      }else{
        addWatchList(loggedInUser,movie)
      }
    }

  return (
    // Watch it later movie card
    <div key={movie.id} className="p-[1rem] relative"
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}>
              <img src={`${imgBase}${isWatchList?movie.posterPath:movie.poster_path}`} 
              className={`min-w-[120px] max-w-[150px] md:max-w-[180px] rounded-lg ${!isWatchList&&'cursor-pointer'}`}
              onClick={!isWatchList? ()=>navigate(`/movie/${movie.id}`,{state:{movie:movie}}):undefined}
              style={{filter: isHovered? 'grayscale(75%)': 'grayscale(0)'}}/>

              {(isHovered&&isWatchList)&&
              <div
              className='h-[80px] w-[50px] bg-[#F1F1F1] absolute top-0 right-0 rounded-2xl flex flex-col items-center p-[1rem] gap-[0.8rem]'>
              <FontAwesomeIcon icon={faTrash} style={{color: '#000000',cursor:'pointer'}}
              onClick={()=>remove()}/>
              <FontAwesomeIcon icon={faThumbsUp} style={{color: '#D4D165',cursor:'pointer'}}/>
              </div>}
            {!isWatchList&&<div className='absolute top-[10%] right-[15%] text-white'
              style={{display:isHovered?'block':'none'}}
              onClick={()=>bookmarkFn()}>
                {isBookmarked?
                <FontAwesomeIcon icon={faBookmarkSolid} className='text-xl' />:<FontAwesomeIcon icon={faBookmarkRegular} className='text-xl'/>}
              </div>}
    </div>
  )
}

export default MovieCard