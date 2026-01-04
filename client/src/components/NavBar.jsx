import React from 'react'

const NavBar = () => {
  return (
    <nav  className="nav-bar w-full h-16 backdrop-blur-[5px] pt-2 z-1000  rounded   fixed top-0 flex items-center justify-between px-15">
        <div className="left cursor-pointer font-md text-lg">
            Code<span className='italic'>Audit</span>
        </div>
        <div className="middle flex gap-8 font-light">
            <a href="#home">Home</a>
             <a href="#info">Features</a>
            <a href="#price">Pricing</a>

        </div>
        <div className="right mt-2 border-2 border-white px-4 py-2 rounded-full cursor-pointer hover:bg-white hover:text-black transition-all">
            Contact Us
        </div>
      </nav>
  )
}

export default NavBar
