import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();

  const eventHandeler = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile", { withCredentials: true });
      dispatch(addUser(user.data));
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    eventHandeler();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Body;
