import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import MovieCard from '../features/movies/MovieCard'
import Spinner from '../components/Spinner'

const WatchLaterPage = () => {

   // logging out after login in this page will not render to logged out version 
    const { loggedInUser,loading, watchList} = useContext(UserContext)
    // const [watchList, setWatchList]= useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        if(loading || !loggedInUser) return
    },[loggedInUser,loading])

    useEffect(()=>{
        if(watchList.length>=0){
            setIsLoading(false)
        }
    }, [watchList])


  return (
    <div className='p-[3rem] md:px-[4.5rem]'>
        <div className='p-[2rem] text-3xl font-bold'>{loggedInUser?loggedInUser.name:""} <span className='heading-font'>Watch List</span></div>
            {
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 max-w-[1200px] md:pt-[3rem] pb-[5rem] min-h-[395px]'>
                {isLoading?<Spinner/>:watchList.length>0?watchList.map(list=>(
                    <MovieCard movie={list} isWatchList={true} key={list.movieId}/>
                )):"No watchlist"}
            </div>
            }
    </div>
  )
}

export default WatchLaterPage