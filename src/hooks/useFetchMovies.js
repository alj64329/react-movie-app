import { useEffect,useState } from "react";
import { API_BASE_URL, API_OPTIONS } from "../constant/api";

export default function useFetchMovies(end){
    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage]= useState('')

 const fetchMovies = async()=>{
    setIsLoading(true)
    setErrorMessage('')

    try{
      const endpoint=`${API_BASE_URL}/${end}`
      console.log(endpoint)

      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok){
        throw new Error('Failed to fetch movies')
      }
      const data = await response.json()
      console.log(data)
      const filteredData = data.results.filter(movie=> movie.poster_path!==null&&movie.backdrop_path!==null)

      setMovieList(filteredData?filteredData:data || [])
    }catch(err){
      console.log(`Error fetching movies: ${err}`)
      setErrorMessage(`Error fetching movies. Please try again later`)
    }finally{
      setIsLoading(false)
    }
  }
    useEffect(()=>{
        fetchMovies()
    },[end])

    return {movieList, isLoading, errorMessage}
}

