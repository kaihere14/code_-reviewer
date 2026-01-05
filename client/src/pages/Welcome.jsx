import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Glow from "../components/Glow";
import HeroTwo from "../components/HeroTwo";
import Card from "../components/Card";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";


const Welcome = () => {
    



  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center relative overflow-hidden">

        <NavBar  />

        <Glow/>

        <Hero />

        <HeroTwo/>

        <Pricing/>

        <Footer/>
    </div>
  );
};

export default Welcome;
