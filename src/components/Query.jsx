import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addQueryFrom, addQueryOther } from "../utils/QuerySlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Query = () => {
  const dispatch = useDispatch();
  const { toUserId } = useParams();

  const user = useSelector((store) => store.user);
  const myQuerie = useSelector((store) => store.query.from);
  const otherQuerie = useSelector((store) => store.query.to);

  const { firstName, photoURl, _id } = user;

  const [name, setName] = useState(firstName || "");
  const [query, setQuery] = useState("");
  const [myQueries, setMyQueries] = useState(myQuerie || []);
  const [otherQueries, setOtherQueries] = useState(otherQuerie || []);

  const myLastQuery = myQueries[myQueries.length - 1] || [];
  const otherLastQuery = otherQueries[otherQueries.length - 1] || [];

  const otherPhotoUrl =
    otherLastQuery.length > 0
      ? otherLastQuery[0].fromPhotoUrl
      : "https://www.sprintdiagnostics.in/images/user.jpg";

  useEffect(() => {
    setMyQueries(myQuerie);
  }, [myQuerie]);

  useEffect(() => {
    setOtherQueries(otherQuerie);
  }, [otherQuerie]);

  useEffect(() => {
    if (firstName) setName(firstName);
  }, [firstName]);

  // ✅ Send query and update instantly in UI
  const eventHandler = async () => {
    if (query.trim().length === 0) return;

    // Show message instantly in UI
    const newMessage = {
      query,
      toPhotoUrl: photoURl,
    };
    setMyQueries((prev) => {
      const last = [...prev];
      last[last.length - 1] = [...(last[last.length - 1] || []), newMessage];
      return last;
    });

    setQuery("");

    try {
      const hii=await axios.post(BASE_URL+`/user/query/${toUserId}`, { query }, { withCredentials: true });


      console.log("query is sended");
      const myRes = await axios.get(BASE_URL+`/user/query/from/${_id}`, {
        withCredentials: true,
      });
      const otherRes = await axios.get(BASE_URL+`/user/query/to/${_id}`, {
        withCredentials: true,
      });

      dispatch(addQueryFrom(myRes.data));
      dispatch(addQueryOther(otherRes.data));
      setMyQueries(myRes.data);
      setOtherQueries(otherRes.data);
    } catch (err) {
      console.error("Error sending query:", err.message);
    }
  };

  return (
    <div>
      {/* Other User's Messages */}
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="User avatar" src={otherPhotoUrl} />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50"></time>
        </div>
        <div className="flex flex-col space-y-1">
          {otherLastQuery.length > 0 &&
            otherLastQuery.map((data, index) => (
              <div key={index} className="chat chat-start">
                <div className="chat-bubble px-4">{data.query}</div>
              </div>
            ))}
        </div>
      </div>

      {/* My Messages */}
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="My avatar" src={photoURl} />
          </div>
        </div>
        <div className="chat-header">{name}</div>
        <div className="flex flex-col space-y-1">
          {myLastQuery.length > 0 &&
            myLastQuery.map((data, index) => (
              <div key={index} className="chat chat-end">
                <div className="chat-bubble px-4">{data.query}</div>
              </div>
            ))}
        </div>
        <div className="chat-footer opacity-50"></div>
      </div>

      {/* Input Box */}
      <div className="flex justify-end m-4">
        <input
          type="text"
          value={query}
          placeholder="Ask a query"
          className="input input-md w-64"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline btn-success mx-3" onClick={eventHandler}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Query;
