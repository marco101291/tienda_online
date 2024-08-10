import React from "react";
import AuthForm  from "../components/AuthForm";

const Register = () =>{
     return(
          <div className="flex">
               <AuthForm isLogin={false} />
          </div>
     )
}

export default Register;