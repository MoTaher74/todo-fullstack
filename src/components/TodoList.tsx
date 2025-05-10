
import axiosInstance from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";


const storageKey = "isLoggedIn";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
const URL = "/users/me?populate=todos";
const TodoList =()=>{

// const [todos,setTodos] = useState([]);
// const [loading,setLoading] = useState(true);

//   useEffect(()=>{
//     try {
//         const response = axiosInstance.get(URL,{
//             headers: {
//                 Authorization: `Bearer ${userData.jwt}`,
//               },
//         }).then((res)=>{setTodos(res.data.todos)}).catch((err)=>{console.log(err)});
//         console.log(response)
//     } catch (error) {
//        console.log(error) 
//     } finally{
//         setLoading(false);
//     }
//   },[userData.jwt]);


const {isLoading,data,error} =useQuery({
    queryKey:["todos"],
    
    queryFn:async ()=>{
       const {data}= await axiosInstance.get(URL,{
            headers:{
                Authorization: `Bearer ${userData.jwt}`
            }
        })
            
        return data.todos;
    }
});

// console.log(data , isLoading ,error);


//   render fun .

// const renderTodos = data.todos.map(todo=>(
//     <div key={todo.id} className="flex items-center justify-between hover:bg-gray-200 duration-300 p-3 rounded-md even:bg-gray-100">
// <p className="w-full font-semibold">{todo.title}</p>
// <div className="flex items-center justify-end w-full space-x-3">
//     <button>Edit</button>
//     <button>remove</button>
// </div>

// </div>
// )) 

// loading spinner
if(isLoading) return <h1>Loading ....</h1>

if (error) return 'An error has occurred: ' + error.message

return (
    <section className="space-y-2">
        {/* {renderTodos} */}

        {

    data.map(todo=>(
        <div key={todo.id} className="flex items-center justify-between hover:bg-gray-200 duration-300 p-3 rounded-md even:bg-gray-100">
    <p className="w-full font-semibold">{todo.title}</p>
    <div className="flex items-center justify-end w-full space-x-3">
        <button>Edit</button>
        <button>remove</button>
    </div>

    </div>
    ))
        }
    </section>

)
}

export default TodoList ;