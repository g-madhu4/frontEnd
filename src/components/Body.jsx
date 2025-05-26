import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {

  // const navigate=useNavigate();
  const dispatch=useDispatch();
  const eventHandeler =async()=>{
     try{
    const user =await axios.get(BASE_URL+"/profile",{withCredentials:true}); 
    dispatch(addUser(user.data));
  
     }
     catch(err){
    //  jjjjjj
     }
  }
  useEffect(()=>{
    eventHandeler();
  },[])
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body

