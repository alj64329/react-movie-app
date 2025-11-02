import useFetchMovies from '../../hooks/useFetchMovies'
import Spinner from '../../components/Spinner'
import MovieItem from '../../components/MovieItem'

const GridDisplay = (props) => {
  const {movieList:movies, isLoading, errorMessage} = useFetchMovies(props.query)

  return (
    <div className='p-[2rem]'>
      <h2 className='uppercase heading-font text-3xl'>{props.title}</h2>
      <div className='pt-[1rem]'>
        {isLoading ? (<Spinner/>):errorMessage?(<p>{errorMessage}</p>):
        <ul className='flex gap-[1rem] overflow-x-auto'>
            {movies.map((movie)=>(
              <MovieItem key={movie.id} movie={movie} />
            ))}
        </ul>}
      </div>
        
    </div>
  )
}

export default GridDisplay