import React, { useEffect, useState } from "react";
import { AI_PROMPT, SelectBudgetOptions, SelectTraveleslist } from "../../constants/Option";
import axios from "axios";
import { chatSession } from "../../service/AIModel";
import CustomizedDialogs from "../Dailogbox/Dailog";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { getApp } from "firebase/app";
import { db } from "../../service/Firebaseconfig";
import { useNavigate } from "react-router-dom";



function Createtrip() {
  const [formdata, setFormdata] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [opendailog,setopendailog]=useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[loading,setloading]=useState(false);
  const navigate=useNavigate()

  // Debounce API call to reduce excessive requests
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.trim() !== "") {
        fetchPlaces(query);
      } else {
        setResults([]);
      }
    }, 300); // Debounce time

    return () => clearTimeout(delaySearch);
  }, [query]);

  const fetchPlaces = async (searchText) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const handleSelectPlace = (place) => {
    setQuery(place.display_name);
    setShowSuggestions(false); // Hide dropdown after selection
 
  };
  const handleInputChange = (name, value) => {
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  useEffect(()=>{
    console.log(formdata)
  },[formdata])

  const OnGenerateTrip=async()=>{

   const user=localStorage.getItem('user');
   if(!user){

    setopendailog(true);
    return ;
   }


    if(formdata?.noOfdays>5||!formdata?.location||!formdata?.Budget||!formdata?.traveler)
    {
     
       setErrorMessage("Please fill all details before generating the trip.");
      return ;
    }
    setErrorMessage("");
    setloading(true);
    const FINAL_prompt=AI_PROMPT
    .replace('{location}',formdata?.location)
    .replace('{totaldays}',formdata?.noOfdays)
    .replace('{traveler}',formdata?.traveler)
    .replace('{Budget}',formdata?.Budget)
    .replace('{totaldays}',formdata?.noOfdays)
    
    const result =await chatSession.sendMessage(FINAL_prompt)
  
    console.log(result?.response?.text());
    setloading(false);
    SaveTrip(result?.response?.text());
  }

  const SaveTrip=async(tripData)=>{
    setloading(true);
     const user=JSON.parse(localStorage.getItem('user')||"{}");
     const docId=Date.now().toString()
    console.log(JSON.parse(tripData))
    await setDoc(doc(db,'AITrip',docId),{
         userselection:formdata,
         tripdata:JSON.parse(tripData),
         userEmail:user?.email,
         id:docId
    });
    setloading(false);
    navigate('/view-trip/'+docId)

  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl text-center text-blue-700 mb-4 animate-slide-in-left">
  Tell us your travel preferences ✈️🗺️🌍 &amp; embark on your next adventure!
</h2>

      <p className="mt-3 text-gray-500 text-xl animate-slide-out-right">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 relative">
        <h2 className="text-xl font-medium my-3 animate-slide-in-left">What is your destination of choice?</h2>

        <div className="h-10 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            placeholder="Search places..."
            className="border-2 p-2 rounded-md w-full animate-slide-out-right"
          />
          
          {/* Location Suggestions */}
          {showSuggestions && results.length > 0 && (
            <div className="absolute left-0 right-0 bg-white shadow-blue-50 shadow-2xl rounded-sm border max-h-60 overflow-y-auto z-10 mt-0.5">
              {results.map((place, index) => (
                <div
                  key={index}
                  className="p-1  cursor-pointer hover:bg-sky-200"
                  onClick={() => {handleSelectPlace(place);
                    handleInputChange('location',place.display_name)}
                  }
                >
                  {place.display_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-medium my-3 mt-10 animate-slide-in-left">How many days are you planning your trip?</h2>
        <input
          type="number"
          placeholder="Ex. 3"
           className="border-2 p-2 rounded-md w-full animate-slide-out-right"
          min="1"
          max="50"
          onChange={(e)=>handleInputChange('noOfdays',e.target.value)}
        />
      </div>

      <div>
        <h2 className="text-xl my-3 mt-10 font-medium animate-slide-in-left">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5 animate-slide-out-right">
          {SelectBudgetOptions.map((e, index) => (
            <div
              key={index}
              onClick={() => setFormdata((prevData) => ({ ...prevData, Budget: e.title }))}
              className={`p-4 rounded-lg  cursor-pointer hover:shadow-2xl hover:scale-103 
                ${formdata?.Budget === e.title ? 'shadow-2xl border-black border  scale-103' : ''}`}
            >
              <h2 className="text-4xl">{e.icon}</h2>
              <h2 className="font-bold text-lg">{e.title}</h2>
              <h2 className="text-sm text-gray-500">{e.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 mt-10 font-medium animate-slide-in-left">Who do you plan on traveling with?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5 animate-slide-out-right">
          {SelectTraveleslist.map((e, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg  cursor-pointer hover:shadow-2xl hover:scale-103 
                ${formdata?.traveler === e.people ? "shadow-2xl border-black border scale-103" : ""}`}
              onClick={() => setFormdata({ ...formdata, traveler: e.people })}
            >
              <h2 className="text-4xl">{e.icon}</h2>
              <h2 className="font-bold text-lg">{e.title}</h2>
              <h2 className="text-sm text-gray-500">{e.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex justify-center">
      {errorMessage && <div className="font-bold bg-white text-black mr-5 animate-bounce  rounded-md text-center">{errorMessage}</div>}
      <button 
        disabled={loading}
        className="bg-black text-white rounded-md p-2 hover:scale-105 cursor-pointer h-10 w-32 hover:text-amber-100 flex justify-center"
        onClick={OnGenerateTrip}>
          {loading? <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin hover:scale-0"></div>: 'Generate Trip'}
        </button>

      </div>
      <CustomizedDialogs open={opendailog} handleClose={() => setopendailog(false)} />
  
    </div>
  );
}

export default Createtrip;
