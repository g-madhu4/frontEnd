import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnectedUsers } from '../utils/ConnectionsSlice';
import ConnectionsCard from './ConnectionsCard';

const Requests = () => {
  const dispatch = useDispatch();
  const connectionsData = useSelector((store) =>store.connections);
 
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        dispatch(addConnectedUsers(response.data));
        
      } catch (err) {
        console.log(err.message);
      }
    };

    if (!connectionsData || connectionsData.length === 0) {
      fetchRequests();
    }
  }, [dispatch]);

  return (
    <div>
      {connectionsData && connectionsData.connections.length !== 0 ? (
        <div>
          {connectionsData?.connections?.map((request) => {
        return (
              <ConnectionsCard key={request._id} user={request} />
              );
            })}
        </div>
      ) : (
       <p className="text-2xl  text-center text-gray-700  mt-10">
        0 requests. Tragic.<br />
        Go make some noise and get noticed! 🚀
        </p>

      )}
    </div>
  );
};

export default Requests;
