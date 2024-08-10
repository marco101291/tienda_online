import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { incrementQuantity, decrementQuantity, removeItem } from "../redux/cartSlice";

const CartDropdown = ({cartItems,toggleCartDropdown}) => {

     const dispatch = useDispatch();

     const handleIncrement = (id) => {
          dispatch(incrementQuantity(id));
        };
      
        const handleDecrement = (id) => {
          dispatch(decrementQuantity(id));
        };
      
        const handleRemove = (id) => {
          dispatch(removeItem(id));
        };

     return(
          <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-50">
               <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
                    {cartItems.length > 0 ? (
                         <>
                              <ul className="mb-4 max-h-48 overflow-y-auto">
                              {cartItems.map((item)=>(
                                   <li key={item.id} className="flex justify-between items-center mb-2">
                                        <div>
                                             <p className="text-sm">{item.name}</p>
                                             <p className="text-sm text-gray-600">${item.price} x {item.quantity}</p>
                                             <div className="flex items-center">
                                                  <button onClick={() => handleDecrement(item.id)} className="text-red-600 mr-2">
                                                  -
                                                  </button>
                                                  <span>{item.quantity}</span>
                                                  <button onClick={() => handleIncrement(item.id)} className="text-green-600 ml-2">
                                                  +
                                                  </button>
                                             </div>
                                        </div>
                                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover"/>
                                   </li>
                              ))}

                              </ul>
                              <Link onClick={toggleCartDropdown} to="/cart" className="text-blue-600 hover:underline">
                              View Cart
                              </Link>
                         </>
                         
                    ) : (
                         <p className="text-sm text-gray-600">Your cart is empty</p>
                    )}
                    
               </div>
          </div>
     )
}

export default CartDropdown