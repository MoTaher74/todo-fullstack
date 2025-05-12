
import { useState } from "react";
import EmptyTask from "../components/EmptyTask";
import Paginator from "../components/ui/Paginator";
import TodoSkeleton from "../components/ui/TodoSkeleton";
import useAuthQuery from "../hooks/useAuthQuery";




const storageKey = "isLoggedIn";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
const URL = "/todos";
const TodoPage =()=>{
    const [pagePagination,setPagePagination] = useState(1);

    const onClickPrev =()=>setPagePagination(prev=>prev - 1);
    const onClickNext =()=>setPagePagination(prev=>prev + 1);
    const {isLoading,data} = useAuthQuery({queryKey:["paginetorTodo",`${pagePagination}`],url:URL,config:{headers: { Authorization: `Bearer ${userData.jwt}`}}});
    console.log("API response", data);
    console.log("Fetching from URL:", URL);
    if(isLoading){
        return Array.from({length:15}).map((_,index)=><TodoSkeleton key={index}/>)
    }

   
    return (
        <section className="space-y-2">

{data?.data?.length ? (
    data.data.map(({id, title}: {id: number, title: string}) => (
        <div key={id} className="max-w-lg mx-auto flex items-center justify-between hover:bg-gray-200 duration-300 p-3 rounded-md even:bg-gray-100">
            <p className="w-full font-semibold">📝{id} -  {title}</p>
        </div>
    ))
) : (
    <EmptyTask title={"Empty Now"}/>
)}
        <Paginator page={pagePagination} pageCount={4}  onClickPrev={onClickPrev} onClickNext={onClickNext}/>
        </section>
    )
}

export default TodoPage ;