import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function CustomizedDialogs({ open, handleClose }) {
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

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
  } else {
    console.error("No data received to store.");
  }
  handleClose();
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
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
  );
}
