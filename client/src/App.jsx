import React, { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { logo } from './assets'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 border-b border-b-[#e6ebf4] mt-2 pb-2">
        <Link to="/">
          {/* <img src={logo} alt="OpenBook" className='w-28 object-contain' /> */}
          <h1 className="font-logo font-bold text-4xl">OpenAnime</h1>
        </Link>
        {isLoggedIn ? (
        <Link to="/create-post"
        className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
          Create
        </Link>
        ) :(
        <Link to="/login"
        className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
          Log in
        </Link>
        )}
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9ffafe] min-h-[calc(100vh - 73px)]">
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/create-post" element={<CreatePost/>} />
        </Routes>
      </main>
      </BrowserRouter>
  )
}

export default App
