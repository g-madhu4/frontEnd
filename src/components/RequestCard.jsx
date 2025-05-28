import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/RequestsSlice";


const RequestCard = ({ request }) => {
  const dispatch = useDispatch();
  const[toast,setToast]=useState(false);
  const[review,setReview]=useState("");
  if (!request) return null;

  const { _id: requestId, fromUserId } = request;
  const { firstName, lastName, photoURl, skills = [] } = fromUserId;
  

  const accepteEvent = async () => {
    try {
      await axios.post(`${BASE_URL}/request/review/accepted/${fromUserId._id}`,{},{withCredentials:true});
      dispatch(removeUser(requestId));
      setReview("Accepted");
      setToast(true);
      setTimeout(()=>{
        setToast(false)
      },3000);
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const rejectEvent = async()=>{
    try{
      await axios.post(BASE_URL+`/request/review/rejected/${fromUserId._id}`,{},{withCredentials:true});
      dispatch(removeUser(requestId));
      setReview("Rejected");
      setToast(true);
      setTimeout(()=>{
        setToast(false)
      },3000);
    }
    catch(err){
       console.log("Error rejecting request :",err)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-base-100 p-4 my-4 rounded-lg shadow-md">
      <h2 className="text-xl m-4">Your Requests</h2>
      <div className="flex flex-col lg:flex-row-reverse items-center bg-base-300 p-4 rounded-lg gap-6 justify-between">
        <img
          src={photoURl}
          className="w-40 h-40 object-cover rounded-lg shadow-xl mb-4 lg:mb-0 lg:ml-18"
          alt={`${firstName} ${lastName}`}
        />
        <div className="text-center lg:text-left ml-5">
          <h1 className="text-2xl font-bold">{firstName} {lastName}</h1>
          <p className="py-2">
            Skills: {skills.length > 0 ? skills.join(', ') : 'No skills listed'}
          </p>
          <div className="mt-2">
            <button className="btn btn-secondary mx-2" onClick={accepteEvent}>Accepted</button>
            <button className="btn btn-accent" onClick={rejectEvent}>Rejected</button>
          </div>
        </div>
      </div>
       {toast &&
           <div className="toast toast-top toast-center">
           <div className="alert alert-success">
           <span>You {review} the request successfully.</span>
            </div>
             </div>
    }
    </div>
  );
};

export default RequestCard;