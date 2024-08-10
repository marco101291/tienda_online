import React from 'react';
import { Link } from 'react-router-dom';

const ProfileDropDown = ({user, onLogout}) => {
     return(
          <div className="relative">
               <button className="text-white ml-4">{user.username}</button>
               <div className="absolute right-0 mt-2 w-48 bg-white border rounder shadow-md">
               <Link to="/profile" className='block px-4 py-2 text-gray-800 hoaver:bg-gray-200'>
                    Profile
               </Link>
               <button
                    onClick={onLogout}
                    className='block w-full text-left px-4 py-2 text-gray-800'
               >
                    Logout
               </button>
               </div>
          </div>
          
     )
}

export default ProfileDropDown;