import { Op } from "sequelize";
import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;

export const createUser = async(req, res)=>{
     const {username, email, password} = req.body;

     if(!username || !email || !password){
          return res.status(400).json({error: 'All the fields are mandatory'})
     }

     const existingUser = await User.findOne({
          where: {
               [Op.or] : [
                    {email: email},
                    {username: username}
               ]
          }
     })

     if(existingUser){
          return res.status(400).json({message: 'User already exists'});
     }
     try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await User.create({username, email, password : hashedPassword});
          const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: EXPIRES_IN});

          //Store token in a cookie session
          res.cookie('token', token, {
               httpOnly: true, 
               secure: false,
               maxAge: 3600000 //Valid thru 1h
          })
          return res.status(201).json({user, token});
     } 
     catch (error) {
          return res.status(400).json({error: error.message});
     }
}

export const loginUser = async (req, res) =>{
     const {email, password} = req.body;
     if(!email || !password){
          return res.status(400).json({error:'Email y contraseña son obligatorios'});
     }

     try {
          
          const user = await User.findOne({
               where: {
                    email: email
               }
          })
          if(!user){
              return res.status(400).json({message: 'Email account doesn´t exist'})
          }

          const isPasswordMatching = await bcrypt.compare(password, user.password);

          if(!isPasswordMatching){
               return res.status(400).json({message: 'Password is not correct'});
          }

          //JWT Validation

          const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: EXPIRES_IN});

          //Store token in a cookie session
          res.cookie('token', token, {
               httpOnly: true, 
               secure: false,
               maxAge: 3600000 //Valid thru 1h
          })

          return res.status(200).json({user, token});

     } catch (error) {
          return res.status(500).json({message: 'Error logging in', error})
     }
     
}

export const logoutUser = (req, res) => {
     res.clearCookie('token'); //Deletes cookie from token
     return res.json({message: 'Logout succesfully'})
}