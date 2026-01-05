import React from 'react'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
  return (
    <div  className="flex mt-40 flex-col items-center justify-center relative z-10 overflow-hidden">
        <div className=" text-4xl text-center w-screen md:text-9xl font-md">
          Ship cleaner <span className="italic font-serif">code</span> Faster.
        </div>
        <div className="mt-8  text-center text-sm md:text-lg w-[80vw] font-light text-zinc-300">
          Catch bugs before they ship with AI-powered code reviews that
          understand your codebase.
        </div>
        <div className="mt-8 flex gap-5">
          <button onClick={()=>navigate("/login")} className="bg-white cursor-pointer text-black px-8 py-3 rounded-full font-semibold hover:bg-zinc-100 transition-all shadow-lg">
            Start reviewing
          </button>
          <button className="border border-white/30 cursor-pointer text-white/90 px-8 py-3 rounded-full hover:bg-white/10 hover:border-white/50 font-medium transition-all">
            Learn more
          </button>
        </div>

        <div className="landing-image hidden md:flex mt-20 -mb-32 translate-y-6">
          <div className="relative">
            
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-3xl"></div>

           
            <div className="relative mx-auto  md:flex   h-105 w-225 overflow-hidden rounded-xl border border-white/10 shadow-2xl ring-1 ring-white/5">
                    <img
                        src="/landing.png"
                        alt="Code Review Dashboard"
                        className="h-full w-full object-cover"
                    />
                    </div>

          </div>
        </div>
      </div>
  )
}

export default Hero
