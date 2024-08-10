import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../helpers/axiosInstance';

const initialState = {
     items: [],
     status: 'idle',
     error: null
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async()=>{
     const response = await axiosInstance.get('/api/products');
     return response.data;
})

const productsSlice = createSlice({
     name: 'products',
     initialState,
     reducers: {},
     extraReducers : (builder) => {
          builder
               .addCase(fetchProducts.pending, (state)=>{
                    state.status = 'loading';
               })
               .addCase(fetchProducts.fulfilled, (state, action)=>{
                    state.status = 'succeeded';
                    state.items = action.payload;
               })
               .addCase(fetchProducts.rejected, (state, action)=>{
                    state.status = 'failed';
                    state.error = action.error.message;
               });
     }
})

export default productsSlice.reducer;