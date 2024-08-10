import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart, purchaseCart, incrementQuantity, decrementQuantity } from "../redux/cartSlice";
import {useNavigate} from 'react-router-dom'

const Cart = () =>{


     //Gets items, purchase and user state from store using a selector
     const cartItems = useSelector((state)=> state.cart.items);
     const purchaseStatus = useSelector((state)=> state.cart.purchaseStatus);
     const user = useSelector((state)=>state.auth.user);
     const dispatch = useDispatch();
     const navigate = useNavigate();

     //Sends the dispatch to trigger purchase API
     const handlePurchase = () => {
          if(!user) {
               navigate('/login');
          } else {
               dispatch(purchaseCart());
          }
     };


     //Functions to add or decrement quantity and cart emptying


     const handleIncrement = (id) => {
          dispatch(incrementQuantity(id));
     }
     const handleDecrement = (id) => {
          dispatch(decrementQuantity(id));
     }

     const handleRemove = (id) => {
          dispatch(removeItem(id));
     };

     const handleClearCart = () => {
          dispatch(clearCart());
     }

     //Adds item quantity to total
     const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

     //Adds quantity and all kind of items to total price
     const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

     console.log("totalPrice ", totalPrice);
     

     return(
          <div className="p-4">
               <h2 className="text-x1 font-semibold mb-4">Shopping Cart</h2>
               {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
               ) : (
                    <>
                         <ul>
                              {cartItems.map((item)=> (
                                   <li key={item.id} className="flex justify-between items-center mb-2">
                                        <div>
                                             <p>{item.name}</p>
                                             <p>{item.price} x {item.quantity}</p>
                                             <div className="flex items-center">
                                                  <button onClick={()=>handleDecrement(item.id)} className="text-red-600 mr-2">
                                                       -
                                                  </button>
                                                  <span className="pr-1">{item.quantity}</span>
                                                  <button onClick={()=>handleIncrement(item.id)}  className="text-green-600 mr-2">
                                                       +
                                                  </button>
                                             </div>
                                        </div>
                                        <button
                                             onClick={()=> handleRemove(item.id)}
                                             className="text-red-600"
                                        >
                                             Remove
                                        </button>
                                   </li>
                              ))}
                         </ul>
                         <div className="mt-4">
                              <p>Total Items: {totalItems}</p>
                              <p className="mb-3">Total Price: ${totalPrice.toFixed(2)}</p>
                              <button
                              onClick={handlePurchase}
                              className="bg-green-600 text-white py-2 px-4 rounded mr-2"
                              disabled={purchaseStatus === 'loading'}
                              >
                                   {purchaseStatus === 'loading' ? 'Processing...' : 'Purchase' }
                              </button>
                              <button
                              onClick={handleClearCart}
                              className="bg-red-600 text-white py-2 px-4 rounded"
                              >
                                   Clear Cart
                              </button>
                         </div>
                         {purchaseStatus === 'succeeded' && (
                              <p className="mt-2 text-green-600">Purchase successful</p>
                         )}
                         {purchaseStatus === 'failed' && (
                              <p className="mt-2 text-red-600">Purchase failed. Try again</p>
                         )}
                    </>
               )}
          </div>
     )
}

export default Cart;