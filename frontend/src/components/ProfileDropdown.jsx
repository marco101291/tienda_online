import React, {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';

const ProfileDropDown = ({user, onLogout}) => {
     const [isOpen, setIsOpen] = useState(false);
     const dropdownRef = useRef(null);

     const toggleDropdown = () => {
     setIsOpen(!isOpen);
     };

     useEffect(() => {
          const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setIsOpen(false);
            }
          };
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
        }, []);
     return(
          <div className="relative" ref={dropdownRef}>
               <button onClick={toggleDropdown} className="text-white ml-4 profile-icon">{user.username}</button>
               {isOpen && ( 
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
                    )
               }
          </div>
          
     )
}

export default ProfileDropDown;