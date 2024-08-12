import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../helpers/axiosInstance';

const initialState = {
     productList: [],
     product: null,
     status: 'idle',
     error: null
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async()=>{
     const response = await axiosInstance.get('/api/products');
     return response.data;
})

export const fetchProductById = createAsyncThunk(
     'product/fetchProductById',
     async (productId) => {
       const response = await axiosInstance.get(`/api/products/${productId}`);
       return response.data;
     }
   );

const productSlice = createSlice({
     name: 'products',
     initialState,
     reducers: {
          clearProduct(state) {
               state.product = null;
          },
     },
     extraReducers : (builder) => {
          builder
               .addCase(fetchProducts.pending, (state)=>{
                    state.status = 'loading';
               })
               .addCase(fetchProducts.fulfilled, (state, action)=>{
                    state.status = 'succeeded';
                    state.productList = action.payload;
               })
               .addCase(fetchProducts.rejected, (state, action)=>{
                    state.status = 'failed';
                    state.error = action.error.message;
               })
               .addCase(fetchProductById.pending, (state) => {
                    state.status = 'loading';
               })
               .addCase(fetchProductById.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.product = action.payload;
               })
               .addCase(fetchProductById.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
               });
     }
})

export const { clearProduct } = productSlice.actions;

export default productSlice.reducer;