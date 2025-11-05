import { faBars, faMagnifyingGlass, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import Modal from './Modal'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import logo from '../assets/logo.png'

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
                <div className='lg:hidden flex items-center'>
                    {!isMenuOpen?<FontAwesomeIcon icon={faBars} onClick={()=>setIsMenuOpen(!isMenuOpen)}
                        className='cursor-pointer text-2xl'/>:
                        <FontAwesomeIcon icon={faXmark} onClick={()=>setIsMenuOpen(false)} 
                        className='cursor-pointer text-2xl'/>}
                </div>   
                <div className='logo'>
                    <a href="/">
                        <img src={logo}
                        alt="Logo" 
                        width={"60px"}/>
                    </a>
                </div>
            </div> 
             {/* Desktop */}
            <div className='hidden lg:block'>
                <ul className='flex gap-[1rem] font-bold'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/browse">Browse</a></li>
                    {loggedInUser?<li><a href="/watchlist">Watch Later</a></li>:""}
                    <li><a href="/random">Random Picks</a></li>
                </ul>
            </div>

            {/* mobile */}
            {isMenuOpen&&
            <div className='absolute bg-[#202025] top-[95%] left-0 z-40 w-[100vw] h-[90vh]'
            onMouseLeave={()=>setIsMenuOpen(false)}>
                <ul className='flex flex-col justify-center items-center gap-[1rem] pt-[7rem] p-[2rem] font-bold text-3xl'>
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
                <div className='flex flex-col items-center'>
                    <FontAwesomeIcon icon={faUser} onClick={()=>setIsModalOpen(true)} className='cursor-pointer' />
                    <div className='text-sm'>Hello, {loggedInUser?loggedInUser.name:"Guest"}</div>
                </div>
                {isModalOpen&&<Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>}
            </div>
        </div>

    </header>
  )
}

export default Navbar