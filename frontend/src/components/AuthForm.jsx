import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, resetStatus } from "../redux/authSlice";
import { useNavigate, useLocation  } from "react-router-dom";


const AuthForm = () =>{

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [username, setUsername] = useState('');
     const [isLogin, setIsLogin] = useState (true);
     const dispatch = useDispatch();
     const {status, error, user} = useSelector((state)=> state.auth);
     const navigate = useNavigate();
     const location = useLocation();
     

     console.log("error from authform: ", error)
     // console.log("status from authform: ", status)
     // console.log("user from authform: ", user)

     useEffect(() => {
          
          if(status === 'succeeded' && user) {
               navigate('/');
          }

          if (location.pathname === '/login') {
               setIsLogin(true);
             } else if (location.pathname === '/register') {
               setIsLogin(false);
             }

          

     }, [status, user, navigate, error, location])
     

     setTimeout(()=>{
          if(status === 'failed' && error ){
               dispatch(resetStatus());
               
          }
     },2000)

     const handleSubmit = (e) => {
          e.preventDefault();
          if(isLogin) {
               dispatch(loginUser({email, password}))
          } else {

               dispatch(registerUser({username, email, password}))
          }
     }

     const toggleForm = () => {
          
          setEmail('');
          setPassword('');
          setUsername('');

          setIsLogin(!isLogin);
          if(isLogin) {
               navigate('/register');
          } else {
               navigate('/login');
          }

     }

     return(
          <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded">
               <h2 className="text-2x1 font-semibold mb-6">{isLogin ? 'Login' : 'Register'}</h2>
               <form onSubmit={handleSubmit} autoComplete={isLogin ? "on" : "new-email"}>
                    {!isLogin && (
                         <div className="mb-4">
                              <label className="block text-gray-700 mb-2">Username</label>
                              <input 
                                   type="text" 
                                   value={username}
                                   onChange={(e)=>setUsername(e.target.value)}
                                   className="w-full p-2 border rounded"
                                   required
                              />
                         </div>
                    )}
                    <div className="mb-4">
                         <label className="block text-gray-700 mb-2">
                              Email
                         </label>
                         <input 
                              type="email" 
                              value={email} 
                              onChange={(e)=>setEmail(e.target.value)}
                              className="w-full p-2 border rounded"
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700 mb-2">
                                   Password
                         </label>
                         <input 
                              type="password" 
                              value={password} 
                              onChange={(e)=>setPassword(e.target.value)}
                              className="w-full p-2 border rounded"
                         />
                    </div>
                    <button 
                         type="submit"
                         className="w-full bg-blue-600 text-white py-2 px-4 rounded"
                         disabled={status === 'loading'}
                    >
                         {status === 'loading' ? 'Loggin in...' : isLogin ? 'Login' : 'Register'}
                    </button>
                    {status === 'failed' && error && (
                         <p className="mt-4 text-red-600 text-center">{error}</p>
                    )}
               </form>
               <p className="mt-4 text-center">
                    {isLogin ? (
                         <>
                              Don't have an account? {' '}
                              <button 
                                   onClick={toggleForm} 
                                   className="text-blue-600 hover:underline"
                              >
                                   Register
                              </button>
                         </>
                    ) : (
                         <>
                              Already have an account?{' '}
                              <button
                              onClick={toggleForm}
                              className="text-blue-600 hover:underline"
                              >
                                   Login
                              </button>
                         </>
                    )
                    }
               </p>
          </div>
     )
}

export default AuthForm;