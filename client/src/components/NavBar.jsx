import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate();
  return (
    <nav  className="nav-bar w-full h-16 backdrop-blur-[5px] pt-2 z-1000  rounded   fixed top-0 flex items-center justify-between px-5 md:px-15">
        <div onClick={()=>navigate("/")} className="left cursor-pointer font-md text-lg">
            Code<span className='italic'>Audit</span>
        </div>
        <div className="middle  gap-8 font-light hidden md:flex">
            <a href="#home">Home</a>
             <a href="#info">Features</a>
            <a href="#price">Pricing</a>

        </div>
        <div onClick={()=>navigate("/login")} className="right mt-2 border-2 border-white px-4 py-2 rounded-full cursor-pointer hover:bg-white hover:text-black transition-all">
            <a href="login">Start Now</a>
        </div>
      </nav>
  )
}

export default NavBar
