import { Collections, Hd, HighQuality } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { query,collection,where,getDocs } from 'firebase/firestore';
import { db } from '../service/Firebaseconfig';
import UserTripCarditem from './UserTripCarditem.jsx';
function MyTrips() {
     const navigation=useNavigation();
     const [userTrips,setuserTrips]=useState([]);
  useEffect(()=>{
       GetUserTrips();
  },[])
  const GetUserTrips=async()=>{
       const user=JSON.parse(localStorage.getItem('user'));
      // console.log(user)
      
       if(!user){
        navigation('/');
        return;
       }
  setuserTrips([]);
  const q=query(collection(db,'AITrip'),where('userEmail','==',user?.email))
    const querySnapshot=await getDocs(q);
      querySnapshot.forEach((doc)=>{
       //   console.log(doc.id,"->",doc.data()); 
          setuserTrips(prev=>[...prev,doc.data()]);
      })
      }
  return (
    <div  className='p-10 sm:p-15 overflow-x-hidden'>
      <h2 className='font-bold text-3xl'>my trips</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
         {userTrips.map((trip,index)=>(
      //  console.log("rri",trip)
      <UserTripCarditem key={index} trip={trip} />
))}
      </div>
    </div>
  )
}

export default MyTrips;
