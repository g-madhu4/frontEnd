import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/RequestsSlice';
import RequestCard from './RequestCard';

const Requests = () => {
  const dispatch = useDispatch();
  const requestsData = useSelector((store) => store.requests);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(BASE_URL + "/user/requests", {
          withCredentials: true,
        });
        dispatch(addRequests(response.data));
       
        
      } catch (err) {
        console.log(err.message);
      }
    };

    if (!requestsData || requestsData.length === 0) {
      fetchRequests();
    }
  }, [dispatch]); 

  return (
    <div>
     {Array.isArray(requestsData) && requestsData.length !== 0 ? (
      <div>
     {requestsData.map((requestss) => (
      <RequestCard key={requestss._id} request={requestss} />
      ))}
       </div>
    ) : (
   <div className="flex items-center justify-center min-h-[80vh]">
  <h2 className="text-center text-2xl">📡 Request radar is clear. Send a request to start the action!</h2>
   </div>
    )}
    </div>
  );
};

export default Requests;
