import React, { useContext, useState } from 'react'
import { genres } from '../constant/genre'
import { UserContext } from '../context/UserContext'
import { slotMovie } from '../features/random/moviePicker'
import ShowMovies from '../features/random/ShowMovies'
const thisYear = new Date().getFullYear()

const PickForm = ({setEnd}) => {
    const {watchList} = useContext(UserContext)
    const [movieGenres, setMovieGenres] = useState([])
    const [yearFrom, setYearFrom] = useState("")
    const [yearTo, setYearTo] = useState("")
    const [message, setMessege] = useState("")

    function initializeForm(){
        setMovieGenres([])
        setYearFrom("")
        setYearTo("")
    }
    function handleChange(genre) {
        setMovieGenres((prevGenres)=>{
            let updateGenres
            if (prevGenres.includes(genre)) {
                updateGenres = prevGenres.filter(g => g !== genre)
            } else {
                updateGenres=[...prevGenres, genre]
            }
            if(updateGenres.length>0){
                setMessege("")
            }

            return updateGenres
        })
    }

    const pickFormHandler=(e)=>{
        e.preventDefault()

        if(movieGenres.length===0){
            setMessege('Please select at least one genre to match your preference')
            return
        }else{
             const query = slotMovie(movieGenres, yearFrom, yearTo)
             setEnd(query)
        }

        // If year is empty -> from all years
        initializeForm()
    }


  return (
    <div className='px-[1rem] min-h-[435px]'>
        <div className='text-center pb-[1rem] text-3xl heading-font'>
            Do you need some movie picks?
        </div>
        {message?
        <div className='text-center error-msg mx-auto text-red-900 w-fit font-bold'>
            {message}
        </div>:''}
        <form onSubmit={pickFormHandler}
        className='query-form py-[2rem] flex flex-col gap-[1.5rem] items-center'
        >
            <div className='flex years'>
                <label className='font-bold pr-[2rem] md:pr-[4rem] heading-font text-2xl'>Year: </label>
                <input type="number" name="year-from" 
                id="year-from" min="1980" pattern="\d{4}"
                 value ={yearFrom}
                 onChange={(e)=>setYearFrom(e.target.value)}
                 className='w-[65px] md:w-[95px] border-b-2'/>
                 <span className='px-5'>-</span>
                <input type='number' name="year-to" id="year-to"  max={thisYear} pattern="\d{4}"
                value ={yearTo}
                onChange={(e)=>setYearTo(e.target.value)}
                className='w-[65px] md:w-[95px] border-b-2'/>
            </div>

            <div className=''>
                <div>
                    <div className='font-bold heading-font text-2xl'>Choice of genres: </div>
                    <div className='p-[1rem] flex gap-[1rem] flex-wrap justify-center max-w-[550px]'>
                        {genres['genres'].map(genre=>(
                            <div key={genre.name} className='py-[0.3rem]'>
                            <input 
                                type='checkbox' 
                                id={genre.name} 
                                name="myGenres[]" 
                                value={genre.id}
                                className='genre-input' 
                                checked={movieGenres.includes(genre.id)}
                                onChange={() => handleChange(genre.id)}
                            />
                            <label htmlFor={genre.name}
                            className='py-[0.3rem] px-[0.7rem] rounded-2xl cursor-pointer text-[13px] text-[#CECFF1] font-bold border-2'>
                                {genre.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {watchList.length>10&&<div>
                    <input type="checkbox" id='from-watchlist' name='from-watchlist' />
                    <label htmlFor="from-watchlist">Pick from my watch list</label>
                </div>}
            </div>
            <button type="submit"
            className='cursor-pointer font-bold text-3xl heading-font btn-get'>
                Get Picks
            </button>
        </form>
        
    </div>
  )
}

export default PickForm