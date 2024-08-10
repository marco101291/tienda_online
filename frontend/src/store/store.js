import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice.js';
import cartReducer from '../redux/cartSlice.js';
import productsReducer from '../redux/productSlice.js';



export const store = configureStore({
     reducer : {
          auth: authReducer,
          cart: cartReducer,
          products: productsReducer,
     }
})