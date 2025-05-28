import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/FeedSLice';

const FeedCard = ({ card }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, photoURl, skills = [], _id } = card;

  const [toast, setToast] = useState(false);
  const [review, setReview] = useState("");

  const ignoreHandler = async () => {
    try {
      await axios.post(`${BASE_URL}/request/send/ignored/${_id}`, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error("Error in ignore:", err.message);
    }
  };

  const interestHandler = async () => {
    try {
      await axios.post(`${BASE_URL}/request/send/intrested/${_id}`, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(_id));
      setReview("Your request has been sent 🚀");
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      console.error("Error in interested:", err.message);
    }
  };

  return (
    <div className="flex items-center justify-center py-8 px-4 rounded-xl shadow-md my-6 ">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-2xl w-full flex flex-col md:flex-row items-center p-4 md:p-8 space-y-6 md:space-y-0 md:space-x-6">
        <img
          src={photoURl}
          alt={`${firstName} ${lastName}`}
          className="w-40 h-40 object-cover rounded-full border-4 border-blue-300"
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-gray-800">{firstName} {lastName}</h2>
          <p className="mt-2 text-lg text-gray-600">💼 Skills: <span className="text-gray-800">{skills.join(", ") || 'No skills listed'}</span></p>
          <div className="mt-4 flex justify-center md:justify-start space-x-4">
            <button
              className="btn btn-outline btn-error px-6 py-2 rounded-xl hover:scale-105 transition-transform"
              onClick={ignoreHandler}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary px-6 py-2 rounded-xl hover:scale-105 transition-transform"
              onClick={interestHandler}
            >
              Interested
            </button>
          </div>
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

export default FeedCard;