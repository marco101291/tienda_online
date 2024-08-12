import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import CryptoJS from 'crypto-js';

const initialState = {
     user: null,
     token: null,
     status: 'idle',
     error: null
};

const SECRET_KEY = "secret1234";



export const registerUser = createAsyncThunk(
     'auth/registerUser',
     async (userData, { rejectWithValue }) => {
       try {
         const response = await axiosInstance.post('/api/auth/register', userData);
         const data= response.data;
         const user = response.data.user;
         const token = response.data.token;

         console.log("Register User... ","data: ", data, "user: ", user, "token: ", token);

         if (!data || !user || !token) {
           return rejectWithValue('Invalid response from server');
         }
   
         const encryptedUser = CryptoJS.AES.encrypt(
           JSON.stringify(response.data.user),
           SECRET_KEY
         ).toString();
   
         localStorage.setItem('token', response.data.token);
         localStorage.setItem('user', encryptedUser);
   
         return response.data.user;
       } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'Registration failed');
       }
     }
   );

export const loginUser = createAsyncThunk(
     'auth/loginUser',
     async(credentials, {rejectWithValue})=>{

          try {
               const response = await axiosInstance.post('/api/auth/login', credentials);
               const data= response.data;
               const user = response.data.user;
               const token = response.data.token;

               console.log("data: ", data, "user: ", user, "token: ", token);
               
               
               if(!data|| !user || !token) {
                    return rejectWithValue('Invalid response from server');
               }

               const encryptedUser = CryptoJS.AES.encrypt(
                    JSON.stringify(user),
                    SECRET_KEY
               ).toString();

               localStorage.setItem('token', token);
               localStorage.setItem('user', encryptedUser);

               return user;
          } catch (error) {
               
               const errorMessage = error.response?.data?.message;

               return rejectWithValue(errorMessage || 'Login failed');
          }
               
     }
          
)

export const checkAuth = createAsyncThunk(
     'auth/checkAuth',
     async (_, { rejectWithValue }) => {
       const token = localStorage.getItem('token');
       const encryptedUser = localStorage.getItem('user');

       if (!token || !encryptedUser) {
         return rejectWithValue('No token or user found');
       }
   
       try {
          
          const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
          const user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

          return user;

        } catch (error) {
          return rejectWithValue('Authentication failed');
        }
     }
   );


const authSlice = createSlice({
     name: 'auth',
     initialState,
     reducers: {
          logoutUser : (state) => {
               state.user = null;
               state.status = 'idle';
               localStorage.removeItem('token');
               localStorage.removeItem('user');
          },
          resetStatus: (state) => {
               state.status = 'idle';
               state.error = null;
          }
     },
     extraReducers: (builder) =>{
          const token = localStorage.getItem('token');
          builder
               .addCase(registerUser.pending, (state)=>{
                    state.status = 'loading';
                    state.error= null;
               })
               .addCase(registerUser.fulfilled, (state, action)=>{
                    state.status = 'succeeded';
                    state.token = token;
                    state.user = action.payload;
               })
               .addCase(registerUser.rejected, (state, action)=>{
                    state.status = 'failed';
                    state.error = action.payload;
               })
               .addCase(loginUser.pending, (state)=>{
                    state.status = 'loading';
                    state.error= null;
               })
               .addCase(loginUser.fulfilled, (state, action)=>{
                    state.status= 'succeeded';
                    state.user = action.payload;
                    state.token = token;
                    state.error = null;
               })
               .addCase(loginUser.rejected, (state, action)=>{
                    state.status = 'failed';
                    state.error = action.payload;
                    console.log("captured state in Redux: ", action.payload)
               })
               .addCase(checkAuth.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.user = action.payload;
               })
               .addCase(checkAuth.rejected, (state, action) => {
                    state.status = 'idle';
                    state.user = null;
               });
               

     }

});

export const {resetStatus, logoutUser} = authSlice.actions;

export default authSlice.reducer;