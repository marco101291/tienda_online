import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import {sequelize} from './utils/db.js'
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';



dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const app = express();

app.use(cors({
     origin: 'http://localhost:3000',
     methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
     credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

//Session setup

app.use(session({
     secret: SECRET_KEY,
     resave: false,
     saveUninitialized: true,
     cookie: {secure: false, httpOnly: true}
}));



//Routes

app.use('/api/products', productRoutes);
app.use('/api/auth', userRoutes)

const PORT = process.env.PORT || 3001;


sequelize.sync().then(()=>{
     app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);       
     })
})