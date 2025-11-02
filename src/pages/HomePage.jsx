import React, { useContext,useEffect, useState } from 'react'
import Hero from '../components/Hero'
import GridDisplay from '../features/movies/GridDisplay'
import { UserContext } from '../context/UserContext'
const API_BASE_URL ='https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS ={
  method:'GET',
  headers:{
    accept:'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const HomePage = () => {
  const {watchList} = useContext(UserContext)
  const [errorMessage, setErrorMessage]= useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading]=useState(false)
  const [end, setEnd] = useState('')
  const [watchlistMovieId, setWatchListMovieId] = useState('')

  const watchListSize = watchList.length

  useEffect(()=>{
    if(watchListSize===0) return

    const radomIndex = Math.floor(Math.random()*watchListSize)
    const randomMovieId = watchList[radomIndex].movieId  
    setWatchListMovieId(randomMovieId)
  },[watchList])

  useEffect(()=>{
    if(watchlistMovieId){
      setEnd(`movie/${watchlistMovieId}/similar`)
    }
  },[watchlistMovieId])
  

  const fetchMovies = async()=>{
    setIsLoading(true)
    setErrorMessage('')
    try{
      const endpoint=`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok){
        throw new Error('Failed to fetch movies')
      }
      const data = await response.json()

      setMovieList(data.results || [])
    }catch(err){
      console.log(`Error fetching movies: ${err}`)
      setErrorMessage(`Error fetching movies. Please try again later`)
    }finally{
      setIsLoading(false)
    }
  }
  useEffect(()=>{
    fetchMovies()
  },[])

  
  return(
    <div>
      <section>
        {movieList.length> 0 && <Hero movies={movieList}/>}

        <GridDisplay title={"Trending"} query={"trending/movie/day"}/>
        <GridDisplay title={"Top rated"} query={"movie/top_rated"}/>
        {watchListSize>0&&<GridDisplay title={"Similar to your watchlist"} 
        query={end}/>}
      </section>

    </div>
    )
}

export default HomePage;
