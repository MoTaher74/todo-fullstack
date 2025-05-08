import type { ILoginForm, IRegisterForm } from "../interface/interface";


export const RegisterFrom :IRegisterForm[]= [
{
    name:"username",
    type:"text",
    placeholder:"Enter Username",
    validation:{
        required:true,
    }
},
{
    name:"email",
    type:"email",
    placeholder:"Enter Your Email",
    validation:{
        required:true,
        pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    }
},
{
    name:"password",
    type:"password",
    placeholder:"Enter Password",
    validation:{
        required:true,
        minLength:8,
        maxLength:16
    }
}
]
export const LoginFrom :ILoginForm[]= [

{
    name:"identifier",
    type:"email",
    placeholder:"Enter Your Email",
    validation:{
   

    }
},
{
    name:"password",
    type:"password",
    placeholder:"Enter Password",
    validation:{
      
    }
}
]

