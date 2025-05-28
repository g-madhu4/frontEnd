import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURl, setPhotoURl] = useState(user.photoURl);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const dispatch =useDispatch();
  const[toast,setToast]=useState(false);


  const eventHandler = async () => {
    try {
      const update = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoURl,
          about,
          gender,
          skills,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(update.data))
      setToast(true);
      setTimeout(()=>{
        setToast(false)
      },3000);
      setError("");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      setError(err.response?.data || err.message);
    }
  };

  return (
    <>
    <div className="flex justify-center my-12">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter image URL"
              value={photoURl}
              onChange={(e) => setPhotoURl(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea
              className="w-full h-32 p-2 border rounded resize-none overflow-y-auto overflow-x-hidden text-[16px]"
              placeholder="Write something about you"
              value={about}
              rows="10"
              cols="10"
              wrap='soft'
              

              onChange={(e) => setAbout(e.target.value)}
            >
              </textarea>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <select
              name='gender'
              id='g1'
              className="input"
              placeholder="Enter gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male" >Male</option>
              <option value="female">Female</option>
              <option value="other" >Other</option>
              </select>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Skills</legend>
            <input
              type="text"
              className="input"
              placeholder="Type skills separated by commas"
              value={skills.join(", ")}
              onChange={(e) =>
                setSkills(e.target.value.split(",").map((s) => s.trim()))
              }
            />
          </fieldset>

          {error && <p className="text-red-500">{error}</p>}

          <div className="card-actions justify-center">
            <button
              className="btn btn-primary justify-center"
              onClick={eventHandler}
            >
              Update Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    {toast &&
    <div className="toast toast-top toast-center">
    <div className="alert alert-success">
    <span>Your profile updated successfully.</span>
   </div>
    </div>
    }
     </>
  );
 
};

export default EditProfile;
