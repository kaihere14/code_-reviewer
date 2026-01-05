import React from 'react'
import useUserStore from '../Zustand/store'
import { useNavigate } from 'react-router-dom';

const HomeNav = () => {
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user)
  return (
    <nav onClick={()=>navigate("/")}  className="nav-bar w-full h-16 backdrop-blur-[5px] pt-2 z-1000  rounded   fixed top-0 flex items-center justify-between px-5 md:px-15">
        <div className="left cursor-pointer font-md text-lg">
            Code<span className='italic'>Audit</span>
        </div>
        <div className="middle  gap-8 font-light hidden md:flex">

            <a href="#home">Home</a>
             <a href="#info">Features</a>
            <a href="#price">Pricing</a>

        </div>
        <div className="right mt-2 border-2 border-white px-4 py-2 rounded-full cursor-pointer hover:bg-white hover:text-black transition-all">
            <a className='flex items-center gap-3' href="profile">
                Profile
                <div className='rounded-full overflow-hidden w-8 h-8'>
                    <img src={user.profileImage} referrerPolicy="no-referrer" alt=' '></img>
                </div>
            </a>
        </div>
      </nav>
  )
}

export default HomeNav
