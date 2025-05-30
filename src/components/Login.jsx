import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error,setError]=useState("");
  const user = useSelector((store) => store.user);
  const[firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const[islogin,setLogin]=useState(false);
  const [toast, setToast] = useState(false);
    const [review, setReview] = useState("");

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
      setReview("Welcome back! You’re now logged in");
       setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
  
     setError(err?.response?.data ||"Something went wrong!");
      
    }
  };
    const eventHandeler2 = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {firstName,lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(response.data));
      navigate("/profile");
      setReview("Signup successful! Welcome aboard.");
       setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
  
     setError(err?.response?.data ||"Something went wrong!");
      
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">{islogin?"Login":"Sign up"}</h2>
          
            {!islogin &&
             <> 
             <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter your First Name:</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
           <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter your Last Name:</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
          </> }
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter your Email Id:</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={emailId}
              onChange={(e) => setEmailID(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter your Password:</legend>
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
            <button className="btn btn-primary justify-center" onClick={()=> islogin ?eventHandeler() :eventHandeler2()}>
             {islogin?"Login":"Sign up"}
            </button>
           
          </div> 
          <p className='text-md m-auto cursor-pointer p-3' onClick={()=>setLogin(!islogin)}>{islogin ?{islogin ? "Join us now." : "Go to login."}
}</p>
        </div>
         {toast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success shadow-lg">
              <span>{review}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
