import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createTheme, ThemeProvider} from '@mui/material'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
// toaster should be at the top hierarchy of the file 
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Auth0Provider } from '@auth0/auth0-react';
// set base url for api calls 
// axios.defaults.baseURL="http://localhost:5000/api/v1";
axios.defaults.baseURL="https://mern-chat-bot-8qil.vercel.app";
// thi will help to exchange cookie 
axios.defaults.withCredentials=true

const theme=createTheme({typography:{fontFamily:"Robott Slab, serif",allVariants:{color:"white"}}})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Toaster position='top-right'/>
      <Auth0Provider 
      domain="dev-m4itrmb3h8ceu528.us.auth0.com"
      clientId="4kdYgswWoxCKJQ5xKE5gtNowAgmIZWak"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      >
    <App/>
    </Auth0Provider>
    </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
