import { useLocation } from 'react-router-dom'
import useFetchMovies from '../hooks/useFetchMovies'
import GridDisplay from '../features/movies/GridDisplay'
import Navbar from '../components/Navbar'
import SearchResult from '../features/search/SearchResult'

const SearchPage = () => {
  const location = useLocation()
  const query = location.state

  const end = `search/movie?query=${encodeURIComponent(query)}&sort_by=popularity.desc`


  return (
    <div>
      <SearchResult title={"Search Result"} query={end}/>
    </div>
  )
}

export default SearchPage