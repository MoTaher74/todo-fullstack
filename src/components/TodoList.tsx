import {useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";


const storageKey = "isLoggedIn";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
const URL = "/users/me?populate=todos";
const TodoList =()=>{
const [todos,setTodos] = useState([]);
const [loading,setLoading] = useState(true);
  useEffect(()=>{
    try {
        const response = axiosInstance.get(URL,{
            headers: {
                Authorization: `Bearer ${userData.jwt}`,
              },
        }).then((res)=>{setTodos(res.data.todos)}).catch((err)=>{console.log(err)});
        console.log(response)
    } catch (error) {
       console.log(error) 
    } finally{
        setLoading(false);
    }
  },[userData.jwt]);


//   render fun .

const renderTodos = todos.length ? todos.map((todo)=>(
    <div key={todo.id} className="flex items-center justify-between hover:bg-gray-200 duration-300 p-3 rounded-md even:bg-gray-100">
<p className="w-full font-semibold">{todo.title}</p>
<div className="flex items-center justify-end w-full space-x-3">
    <button>Edit</button>
    <button>remove</button>
</div>

</div>
)) :<h2>No todo yet </h2>;

// loading spinner
if(loading) return <h1>Loading ....</h1>
return (
    <section className="space-y-2">
        {renderTodos}
    </section>

)
}

export default TodoList ;