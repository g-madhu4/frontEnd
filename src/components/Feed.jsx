import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/FeedSLice';
import FeedCard from './FeedCard';

const Feed = () => {
  const user = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const getFeed = async () => {
      try {
        const users = await axios.get(BASE_URL + "/user/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(users.data.data));
      } catch (err) {
        console.error("Error fetching feed", err);
      }
    };

    if (!feed || feed.length === 0) {
      getFeed();
    }
  }, [user, feed, dispatch, navigate]);

  return (
    <div>
   <h2 className="text-xl font-bold text-center m-4"> Your Feed</h2>

      {feed && feed.length > 0 ? (
        <div>
          {feed.map((card, index) => (
            <FeedCard key={index} card={card} />
          ))}
        </div>
      ) : (
        <p className="flex justify-center text-2xl text-gray-600 mt-10">
    Looks like your feed is empty. Go ahead and ask something 😊!
       </p>
      )}
    </div>
  );
};

export default Feed;
