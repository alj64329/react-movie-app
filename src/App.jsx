import { BrowserRouter as Router, Routes, Route }from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import SearchPage from './pages/SearchPage'
import { UserContext, UserProvider } from './context/UserContext'
import { useContext } from 'react'
import WatchLaterPage from './pages/WatchLaterPage'
import BrowsePage from './pages/BrowsePage'
import MovieDetail from './pages/MovieDetail'
import Footer from './components/Footer'
import RandomPickPage from './pages/RandomPickPage'

const App = () => {


  return (
    <UserProvider>
      <Router>
        <div className='max-w-[1800px] mx-auto bg-[#202025]'>
        <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/watchlist" element={<WatchLaterPage/>}/>
            <Route path="/browse" element={<BrowsePage/>}/>
            <Route path="/movie/:id" element={<MovieDetail/>}/>
            <Route path="/random" element={<RandomPickPage/>}/>
          </Routes>
        <Footer/>
        </div>
      </Router>
    </UserProvider>
  )
}

export default App