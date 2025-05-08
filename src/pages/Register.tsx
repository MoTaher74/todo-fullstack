
import { useForm,type  SubmitHandler } from "react-hook-form"
import Input from "../components/ui/Input";
import { RegisterFrom } from "../data/data";
import InputErrorMsg from "../components/ui/InputErrorMsg";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../validation/validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../interface/interface";
import { useNavigate } from "react-router-dom";

interface IFormInput {
username: string;
email:string;
password:string

}


export default function Register() {
const navigate =useNavigate();
  // pending 
  const [loading,setLoading] =useState(false)
  const { register, handleSubmit,formState:{errors} } = useForm<IFormInput>({
    resolver: yupResolver(RegisterSchema)
  })
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data)
    setLoading(true);
    try {
      // const response = await axiosInstance.post("/auth/local/register",data);
      const {status} = await axiosInstance.post("/auth/local/register",data);
      console.log(status)
      if(status === 200 || status === 201){
        console.log("toaster")
        toast.success("Your account has been created successfully",{
          position:"top-center",
          duration:1200,
          style:{
            
            color:"#4ef29b",
            width:"100%"
          }
        })
      }
    setTimeout(()=>{navigate("/login")},1500)

    } catch (error) {
      console.log(error)
      const errorObj = error as AxiosError<IErrorResponse>

      const message = errorObj.response?.data?.error?.message
      console.log(message)
      
        toast.error(`${message}`,{
          position:"top-center",
          duration:4000,
          style:{
            color:"red",
            width:"100%"
          }
        })
      
    }finally{
      setLoading(false)
    }
  }
const renderInputData = RegisterFrom.map(({name,placeholder,validation,type},idx) =>(
  <div key={idx}>
  <Input type={type} placeholder={placeholder} {...register(name,validation)}  />
  {/* {errors?.name&&errors.name.type === 'required' && <InputErrorMsg msg={`this ${name} is required`}/> } */}
  {errors[name] && <InputErrorMsg msg={errors[name].message}/>}
 
  </div>
  
 )
)

  return (
    <div className="max-w-md mx-auto">
    <h2 className="text-center mb-4 text-3xl font-semibold">
    Register to get access!
    </h2>
    <form onSubmit={handleSubmit(onSubmit)} className="container space-y-4  flex flex-col px-5 text-center mt-20  ">
      {renderInputData}
      <button className="bg-green-600 text-white p-2 w-24 m-auto hover:bg-green-300 hover:text-black rounded-lg"  type="submit">{loading ? "loading..." : "Register"} </button>

    </form>

    </div>
  )
}