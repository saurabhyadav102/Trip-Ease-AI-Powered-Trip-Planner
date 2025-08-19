import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}



function UserMenu({ user }) {
  // State to manage the dropdown's visibility
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Use the custom hook to close the dropdown when clicking outside
  useOutsideAlerter(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center gap-4">
      {/* --- My Trips Button (Sized Down) --- */}
       <a href='/create-trip'>
      <button className="text-black border-2 rounded-full px-4 py-1.5 hover:scale-105 font-semibold text-sm text-center hover:bg-gray-100 transition-all">
        + Create trip
      </button>
      </a>

      <a href='/my-trips'>
      <button className="text-black border-2 rounded-full px-4 py-1.5 hover:scale-105 font-semibold text-sm text-center hover:bg-gray-100 transition-all">
        My Trips
      </button>
      </a>

      {/* --- Dropdown Container --- */}
      <div className="relative" ref={dropdownRef}>
        {/* --- Clickable User Image (Sized Down) --- */}
        <img
          src={user?.picture || 'https://placehold.co/40x40/EFEFEF/333333?text=User'}
          alt="User profile"
          onClick={toggleDropdown}
          className="h-10 w-10 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/EFEFEF/333333?text=User'; }}
        />

        {/* --- Dropdown Menu --- */}
        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 py-1"
          >
            
            <div className="border-t border-gray-200 my-1"></div>
            <a
              href="/"
              onClick={()=>{
                localStorage.removeItem("user");
              googleLogout();
              window.closed();
              console.log(hello)
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-950 hover:text-white"
            >
              Log Out
            </a>
          </div>
        )}
      </div>
    </div>
  );
}






function Header() {
  const [user, setUser] = useState(null);
  const [opendailog,setopendailog]=useState(false);
  const login = useGoogleLogin({
      onSuccess: (codeResp) => GetUserProfile(codeResp),
      onError: (error) => console.log(error)
    });
     const handleClose=()=>{setopendailog(false)}

    const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: `Application/json`
        }
      })
      .then((resp) => {
        console.log("Response data to be stored:", resp.data);
  if (resp.data) {
    localStorage.setItem('user', JSON.stringify(resp.data));
    console.log("Local Storage updated:", localStorage.getItem('user'));
    setopendailog(false);
    window.location.reload();
  } else {
    console.error("No data received to store.");
  }
  handleClose();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
   
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    }
  }, []);

  return (
    <div className="p-4 px-5 shadow-sm flex justify-between items-center bg-white">
      <img
        src="/logo2.png"
        alt="Logo"
        className="h-20 object-contain " 
      />
      <div className="mr-7">
        {user ? (
         
          <UserMenu user={user} />
        ) : (
          // Otherwise, show the Sign In button
          <button className="bg-black text-white rounded-md px-4 py-1.5 hover:scale-105 font-semibold text-sm text-center hover:bg-gray-800 cursor-pointer transition-all" onClick={()=>setopendailog(true)}>
            Sign In
          </button>  
        )}
      </div>
      <React.Fragment>
      <Dialog
        open={opendailog}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        // Responsive styling using sx:
        sx={{
          '& .MuiDialog-paper': {
            width: { xs: '90%', sm: '80%', md: '600px' },
            margin: 'auto',
            p: 2
          }
        }}
      >
        <img
          src="/logo2.png"
          alt="Logo"
          // Using Tailwind’s responsive classes to center and adjust size
          className="h-20 w-20 object-contain scale-180 mx-auto my-5"
        />
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 16,
            top: 16,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <h2 className="font-bold text-lg mt-3 text-center">Sign In With Google</h2>
          <p className="text-center">
            Sign in to the App with secure Google authentication.
          </p>
        </DialogContent>
        <DialogActions className="justify-center">
          <button
            onClick={login}
            className="bg-black text-white rounded-md p-2 hover:scale-105 w-full  text-center hover:text-amber-100 cursor-pointer flex justify-center gap-3"
          >
            <img src="/search.png " alt=""className='h-5 w-5 mt-1' />
            Sign In With Google
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </div>
  );
}

export default Header;