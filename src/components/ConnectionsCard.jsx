import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addQueryFrom, addQueryOther } from '../utils/QuerySlice';

const ConnectionsCard = ({user}) => {
    const{firstName,lastName,photoURl,_id}=user;
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const getMyQuery=async()=>{
        try{
          const myQueries= await axios.get(BASE_URL+`/user/query/from/${_id}`,{withCredentials:true});
          const otherQueries= await axios.get(BASE_URL+`/user/query/to/${_id}`,{withCredentials:true});
          dispatch(addQueryFrom(myQueries.data));
          dispatch(addQueryOther(otherQueries.data));
          navigate(`/user/query/${_id}`);

        }
        catch(err){
          console.log(err.message);
        }
    }

  return (
    <div className="w-full max-w-3xl mx-auto bg-base-100 p-4 my-4 rounded-lg shadow-md">
      <h2 className="text-xl m-4">Your Connections</h2>
      <div className="flex flex-col lg:flex-row-reverse items-center bg-base-300 p-4 rounded-lg gap-6 justify-between">
        <img
          src={photoURl}
          className="w-40 h-40 object-cover rounded-lg shadow-xl mb-4 lg:mb-0 lg:ml-18"
          alt={`${firstName} ${lastName}`}
        />
        <div className="text-center lg:text-left ml-5">
          <h1 className="text-2xl font-bold">{firstName} {lastName}</h1>
          <div className="mt-2">
            <button className="btn btn-secondary mx-2" onClick={()=>{
              getMyQuery();
            }} >Ask Quires</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConnectionsCard;
