import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { logoutUser } from "../redux/authSlice";
import ProfileDropDown from "./ProfileDropdown";
import CartDropdown from "./CartDropDown";


const NavBar = () =>{
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const {user} = useSelector((state)=> state.auth);
     const cartItems = useSelector((state)=> state.cart.items);
     const [isCartOpen, setIsCartOpen] = useState(false);
     const [profileOpen, setProfileOpen] = useState(false);

     const handleLogout = () => {
          dispatch(logoutUser());
          navigate('login');
     }

     const toggleCartDropdown = () => {
          setIsCartOpen(!isCartOpen);
        };

     return (
          <nav className="bg-blue-600 p-4 flex justify-between items-center relative">
               <Link to="/" onClick={toggleCartDropdown} className="text-white text-lg font-semibold">
                    Online Store
               </Link>
               <div className="flex items-center">
                    <div className="relative">
                         <button onClick={toggleCartDropdown} className="text-white relative mr-4"> 
                              Cart ({cartItems.length})
                         </button>
                         {isCartOpen && <CartDropdown cartItems={cartItems} toggleCartDropdown={toggleCartDropdown}/>}
                    </div>
                    {user ? (
                         <ProfileDropDown user={user} onLogout={handleLogout} />
                    ) : (
                         <Link to="/login" className="ml-4 text-white">Login</Link>
                    )}
               </div>
          </nav>
     )
}

export default NavBar;