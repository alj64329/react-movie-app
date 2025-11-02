import { faBars, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Modal from './Modal'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Navbar = () => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const keyHandler=(e)=>{
        if(e.key==="Enter"){
            redirectResult()
        }
    }

    const navigate = useNavigate()
    const redirectResult =()=>{
        const timer = setTimeout(()=>{navigate("/search",{state:searchTerm})},500)
        setIsSearchOpen(false)
        setSearchTerm('')
        return () => clearTimeout(timer)
    }

    
  return (
    <header className='p-[1.2rem] md:p-[2rem] relative max-w-[1800px]'>
        <div className="flex justify-between items-center">
            <div className='flex gap-[1rem]'>
                <div className='block lg:hidden'>
                    <FontAwesomeIcon icon={faBars} onClick={()=>setIsMenuOpen(!isMenuOpen)}
                        className='cursor-pointer'/>
                </div>   
                <div className='logo'>
                    MovieMatch
                </div>
            </div> 
             {/* Desktop */}
            <div className='hidden lg:block'>
                <ul className='flex gap-[1rem]'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/browse">Browse</a></li>
                    {loggedInUser?<li><a href="/watchlist">Watch Later</a></li>:""}
                    <li><a href="/random">Random Picks</a></li>
                </ul>
            </div>

            {/* mobile */}
            {isMenuOpen&&
            <div className='absolute bg-[#202025] top-[95%] left-0 z-100'
            onMouseLeave={()=>setIsMenuOpen(false)}>
                <ul className='flex flex-col gap-[1rem] p-[2rem]'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/browse">Browse</a></li>
                    {loggedInUser?<li><a href="/watchlist">Watch Later</a></li>:""}
                    <li><a href="/random">Random Picks</a></li>
                </ul>
            </div>}

            <div className='flex gap-[1rem]'>
                <div 
                className={`flex gap-[0.5rem] items-center ${isSearchOpen? "absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 top-[95%] border rounded-2xl p-[0.5rem] px-[1rem]":""} sm:static`}
                onMouseLeave={()=>setIsSearchOpen(false)}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} 
                    className='cursor-pointer' 
                    onClick={()=>setIsSearchOpen(!isSearchOpen)} />
                    <div className={`${isSearchOpen?"flex md:block":'hidden'}`}>
                        <input type="text" value={searchTerm} 
                        onChange={(e) =>setSearchTerm(e.target.value)}
                        onKeyUp={(e)=>keyHandler(e)}
                        id="search"/>
                        <button onClick={()=>redirectResult()}>Search</button>
                    </div>
                </div>
                <div>
                    <FontAwesomeIcon icon={faUser} onClick={()=>setIsModalOpen(true)} className='cursor-pointer' />
                    {loggedInUser?<div className='text-sm'>Hello, {loggedInUser.name}</div>:""}
                </div>
                {isModalOpen&&<Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>}
            </div>
        </div>

    </header>
  )
}

export default Navbar