import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IBtn extends ButtonHTMLAttributes<HTMLButtonElement>{
children:ReactNode;
className:string;
width:"w-full"|"w-fit";
type?:"button" | "submit" | "reset"

}

const Button =({className,width="w-full",type,children,...rest}:IBtn)=>{
return ( <button type={type} className={`${className} ${width}  outline-none  transition-all duration-300 p-2 rounded-md text-white`}  {...rest}> {children}</button>

)
}

export default Button ;