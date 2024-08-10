import React from "react";
import AuthForm  from "../components/AuthForm";

const Login = () =>{
     return(
          <div className="flex">
               <AuthForm isLogin={true} />
          </div>
     )
}

export default Login;