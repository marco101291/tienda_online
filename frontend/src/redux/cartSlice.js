import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";

const initialState = {
     items: [],
     status: 'idle',
     purchaseStatus: 'idle',
     error: null
}

export const purchaseCart = createAsyncThunk(
     'cart/purchaseCart',
     async(_, {getState, rejectWithValue}) =>{
          try {
               const {cart} = getState();
               console.log("cart state from cartslice", cart);
               console.log("cart.items", cart.items)
               // const response = await axiosInstance.post('/api/products/purchase', {
               //      items: cart.items
               // });
               const token = localStorage.getItem('token');
               const response = await axiosInstance.post('/api/products/purchase', cart.items, {
                    headers: {
                         'Content-Type': 'application/json',
                         Authorization: `Bearer ${token}`,  // Asegúrate de incluir el token si la ruta está protegida
                    },
               });
               return response.data;
          } catch (error) {
               return rejectWithValue(error.response.data);
          }
     }
)

const cartSlice = createSlice({
     name: 'cart',
     initialState,
     reducers: {
          addItem: (state, action) => {
               const item = state.items.find((item)=> item.id === action.payload.id );
               if(item){
                    item.quantity += 1;
               } else {
                    state.items.push({...action.payload, quantity: 1});
               }
               
          },
          removeItem: (state, action) =>{
               state.items = state.items.filter((item)=>item.id !== action.payload)
          },
          incrementQuantity: (state, action) => {
               const item = state.items.find((item) => item.id === action.payload);
               if (item) {
                 item.quantity += 1;
               }
          },
          decrementQuantity: (state, action) => {
               const item = state.items.find((item) => item.id === action.payload);
               if (item && item.quantity > 1) {
                 item.quantity -= 1;
               }
          },

          clearCart: (state) =>{
               state.items = [];
          },
     },
     extraReducers: (builder) =>{
          builder
               .addCase(purchaseCart.pending, (state)=>{
                    state.purchaseStatus = 'loading';
                    state.error = null;
               })
               .addCase(purchaseCart.fulfilled, (state)=>{
                    state.purchaseStatus = 'succeeded';
                    state.items = [];
               })
               .addCase(purchaseCart.rejected, (state, action)=>{
                    state.purchaseStatus = 'failed';
                    state.error = action.payload;
               })
     }
})

export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;