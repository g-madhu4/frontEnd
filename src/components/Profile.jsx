import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {

  const user=useSelector((store)=>store.user);
  const{firstName,lastName,photoURl,about,skills}=user;

  return (
    <div>
     <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse mx-4">
    <img
      src={photoURl}
      className="max-w-xs rounded-lg shadow-2xl "
    />
    <div>
      <h1 className="text-5xl font-bold">{firstName} {lastName}</h1>
      <p className="py-6 text-2xl">
       {about}
      </p>
       <p className="py-6 text-xl">
       Skills : {skills.join(" , ")}
      </p>
      <Link to={"/editprofile"} className="btn btn-primary">Edit Profile</Link>
    </div>
  </div>
 </div>
    </div>
  )
}

export default Profile;
