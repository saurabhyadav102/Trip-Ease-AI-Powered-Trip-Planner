import React from 'react'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] text-center mt-16 animate-slide-in-left'>
            <span className='text-[#f56551]     '>Discover Your Next adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
            <p className='tect-xl text-gray-500 text-center animate-slide-out-right'>Your personal trip planner and travel curator,creating custom itineraries tailored to you interests and budget</p>
        <Link to={'/create-trip'}>
            <button className='bg-black text-white rounded-md p-2 hover:scale-105 hover:text-amber-100 mt-10 animate-slide-in-up cursor-pointer'>Get Started, it's Free</button>
        </Link>
          
    </div>
  )
}

export default Hero
