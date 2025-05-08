interface IProps{
msg?:string

}

const InputErrorMsg =({msg}:IProps)=>{
return msg? (
<span className="block text-sm font-semibold text-red-700">{msg}</span>

):null
}

export default InputErrorMsg ;