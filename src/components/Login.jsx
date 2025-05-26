import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailID] = useState("Tarun@gmail.com");
  const [password, setPassword] = useState("Tarun@1234");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error,setError]=useState("");
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
  }, [user, navigate]);

  const eventHandeler = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(response.data));
      navigate("/feed");
    } catch (err) {
      console.log(err);
     setError(err?.response?.data ||"Something went wrong!");
      
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter your Email Id</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={emailId}
              onChange={(e) => setEmailID(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter your Password</legend>
            <input
              type="password"
              className="input"
              placeholder="Type here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary justify-center" onClick={eventHandeler}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
