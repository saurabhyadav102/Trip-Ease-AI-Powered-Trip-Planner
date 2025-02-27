import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Createtrip from './components/create-trip/Createtrip.jsx'
import App from './App.jsx'
import Header from './components/Custom/Header.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/Index.tripid.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<Createtrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<Viewtrip/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}> <Header/>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
   
  </StrictMode>,
)
