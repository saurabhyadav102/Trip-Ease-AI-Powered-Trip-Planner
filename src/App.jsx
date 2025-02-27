import { useState } from 'react'
import Hero from './components/Custom/Hero'
import axios from "axios";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Hero/>  
    </>
  )
}

export default App
