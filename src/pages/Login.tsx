import type { AxiosError } from "axios"
import type { IErrorResponse } from "../interface/interface"
import toast from "react-hot-toast"
import axiosInstance from "../config/axios.config"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import InputErrorMsg from "../components/ui/InputErrorMsg"
import Input from "../components/ui/Input"
import { LoginFrom } from "../data/data"
import { LoginSchema } from "../validation/validation"



interface IFormInput {
    identifier:string;
    password:string
    }

const Login = ()=>{

      // pending 
  const [loading,setLoading] =useState(false)
  const { register, handleSubmit,formState:{errors} } = useForm<IFormInput>({
    resolver: yupResolver(LoginSchema)
  })

  console.log(errors)
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data)
    setLoading(true);
    try {
      // const response = await axiosInstance.post("/auth/local/register",data);
      const {status,data:resData} = await axiosInstance.post("/auth/local",data);
      console.log(resData)
      if(status === 200 || status === 201 ){
        console.log("toaster")
        toast.success("Your account has been login successfully",{
          position:"top-center",
          duration:1200,
          style:{
            
            color:"#4ef29b",
            width:"100%"
          }
        })
      }
      localStorage.setItem("isLoggedIn",JSON.stringify(resData));

      setTimeout(
        ()=>{
            // navigate("/")
            location.replace('/');
        },1500)
    

    } catch (error) {
      console.log(error)
      const errorObj = error as AxiosError<IErrorResponse>

      const message = errorObj.response?.data?.error?.message
      console.log(message)
      
        toast.error(`${message}`,{
          position:"top-center",
          duration:1250,
          style:{
            color:"red",
            width:"100%"
          }
        })
      
    }finally{
      setLoading(false)
    }
  }
  const renderInputData = LoginFrom.map(({name,placeholder,validation,type},idx) =>(
    <div key={idx}>
    <Input type={type} placeholder={placeholder} {...register(name,validation)}  />
    {/* {errors?.name&&errors.name.type === 'required' && <InputErrorMsg msg={`this ${name} is required`}/> } */}
    {/* {errors[name] && <InputErrorMsg msg={errors[name].message}/>} */}
   
    </div>
    
   )
  )
  
    return(
        <div className="max-w-md mx-auto ">
        <h2 className="text-center mb-4 text-3xl font-semibold">
          Login to get access!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="container space-y-4   flex flex-col px-5 text-center mt-20  ">
      {renderInputData}
      <button className="bg-green-600 text-white p-2 w-24 m-auto rounded-lg hover:bg-green-300 hover:text-black" type="submit">{loading ? "loading..." : "Login"} </button>


    </form>
    </div>
    )
}

export default Login