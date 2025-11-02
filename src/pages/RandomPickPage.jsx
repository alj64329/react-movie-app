import React, { useState } from 'react'
import PickForm from '../components/PickForm'
import ShowMovies from '../features/random/ShowMovies'


const RandomPickPage = () => {
  const [end, setEnd]= useState("")
  return (
    <div className='p-[2rem]'>

      <div>
        <PickForm setEnd={setEnd} />
        <div className='py-[3rem]'>
          {end && <ShowMovies query={end}/>}
        </div>
      </div>
    </div>
  )
}

export default RandomPickPage