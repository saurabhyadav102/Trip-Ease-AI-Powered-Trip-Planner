import React from 'react'
import { Link } from 'react-router-dom'
function UserTripCarditem({trip}) {
   // console.log("UserTripCarditem")
  return (
    <Link to ={"/view-trip/"+trip?.id}>
    <div className='hover:scale-105 transiton-all hover:shadow-md rounded-2xl '>
      <img src="travel.jpg" alt="" className='object-cover rounded-xl' />

      <div>
        <h2 className='font-bold text-lg'>{trip?.userselection?.location}</h2>
        <h2 className='text-sm text-gray-500 p-1'>{trip?.userselection?.noOfdays} Days trip with {trip?.userselection?.Budget} Budget</h2>
      </div>
      
      
    </div>
    </Link>
  )
}

export default UserTripCarditem;
