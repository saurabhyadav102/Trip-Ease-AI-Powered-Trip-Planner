import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from "../../service/Firebaseconfig";
import { doc,getDoc} from "firebase/firestore";
import Information from '../components/information';
import Recommended from '../components/Recommanded';
import Dailyplan from '../components/Dailyplan';
function Viewtrip() {

    const {tripId}=useParams();
    const [trip,settrip]=useState([]);

    useEffect(()=>{

          tripId&&GetTripData();

    },[tripId])


    const GetTripData=async()=>{
        const docref=doc(db,'AITrip',tripId);

        const docSnap=await getDoc(docref);

        if(docSnap.exists()){
            console.log("docunenbt",docSnap.data());
            settrip(docSnap.data());
        }
        else console.log("no data found")
    }
  return (
    <div className='p-10 sm:p-15'>
         {/* Infomation section */}

         <Information  trip={trip}/>
         {/* Recommended hotels */}
         <Recommended trip={trip}/>
         {/* Daily Plan */}
         <Dailyplan trip={trip}/>
         {/* Footer */}
          <h2 className='m-9 text-right mr-2 mb-1 font-medium text-gray-400 text-md transition-all'>Created By-Saurabh Yadav</h2>
    </div>
  )
}

export default Viewtrip
