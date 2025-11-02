import { useEffect,useState } from "react";
import { API_BASE_URL, API_OPTIONS } from "../constant/api";

export default function useFetchVideo(movieId){
    const [video, setVideo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage]= useState('')

 const fetchVideos = async()=>{
    setIsLoading(true)
    setErrorMessage('')

    try{
      const endpoint=`${API_BASE_URL}/movie/${movieId}/videos`

      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok){
        throw new Error('Failed to fetch movie vedios')
      }
      const data = await response.json()
      const trailers = data.results.filter((item)=>
         ['trailer','teaser'].includes(item.type.toLowerCase())&&item.site==="YouTube")
  
      setVideo(trailers[0]|| [])
    }catch(err){
      console.log(`Error fetching movies: ${err}`)
      setErrorMessage(`Error fetching movie videos. Please try again later`)
    }finally{
      setIsLoading(false)
    }
  }
    useEffect(()=>{
        fetchVideos()
    },[movieId])

    return {video, isLoading, errorMessage}
}
