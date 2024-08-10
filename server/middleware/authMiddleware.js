import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;

export const authenticateToken = (req, res, next) =>{
     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
     console.log("authenticateToken", token)
     if(!token){
          return res.status(401).json({error: 'Access denied, no token provided'});
     }

     try{
          const decoded = jwt.verify(token, SECRET_KEY);
          req.userId = decoded.userId;
          next();
     } catch(error){
          return res.status(403).json({error: 'Invalid or expired token'});
     }
}