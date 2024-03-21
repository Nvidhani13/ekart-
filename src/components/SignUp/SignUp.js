import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Url from '../../Url.js';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
const defaultTheme = createTheme();

export default function SignUp() {
  const [passwordError,setPasswordError]=useState([false,""])
  const [userExist,setUserExist]=useState(false)
  const [formData,setformData]=useState({})
  const navigate=useNavigate()
  const handleSubmit = async(event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log(data)
    let username=data.get("userName")
    let email= data.get('email')
    let password= data.get('password')
    let confirmPassword=data.get('confirmpassword')
    const passwordRegex = /^((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)\w.{6,18}\w)/;
    
    if (!passwordRegex.test(password)) {
      
      setPasswordError([true,"password do not meet requirements.password must contain atleast one Upper case one lower case one digit and one special characte"])
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      
      setPasswordError([true,"password do not match"])
      return;
    }
    setPasswordError([false,""])
    setformData({
      userName:data.get('userName'),
      email:data.get('email'),
      password:data.get('password')
      
    })
    try {
      
      const response = await fetch(Url+'/reg/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name:"nikhil",
          username: data.get('userName'),
          email: data.get('email'),
          password: data.get('password'),
        }),
      });

      if (response.ok) {
        // Redirect to login page upon successful registration
        let data=await response.json()
        if(data.msg==='user already exists'){
                 setUserExist(true)
        }
        else{navigate('/login');}
        
      } else {
        // Log the error if the request fails
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  
                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  error={userExist}
                  name="email"
                  autoComplete="email"
                  helperText={
                    userExist
                      ? "This user already exist"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={passwordError[0]}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={
                    passwordError[0]
                      ? passwordError[1]
                      : ""
                  }
                />
               
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  error={passwordError[0]}
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                  helperText={
                    passwordError[0]
                      ? passwordError[1]
                      : ""
                  }
                />
                
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link  href='/login' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}