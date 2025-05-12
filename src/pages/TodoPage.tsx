
import { useState, type ChangeEvent } from "react";
import EmptyTask from "../components/EmptyTask";
import Paginator from "../components/ui/Paginator";
import TodoSkeleton from "../components/ui/TodoSkeleton";
import useAuthQuery from "../hooks/useAuthQuery";
import axiosInstance from "../config/axios.config";
import { faker } from "@faker-js/faker";
import  Button  from "../components/ui/Button";





const storageKey = "isLoggedIn";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
// const PaginationURL = "/todos?pagination[pageSize]=20&pagination[page]=${statename}";
const TodoPage =()=>{
    const [pagePagination,setPagePagination] = useState<number>(1);



    const onClickPrev =()=>setPagePagination(prev=>prev - 1);
    const onClickNext =()=>setPagePagination(prev=>prev + 1);

    const [pageSize,setPageSize] = useState<number>(10);
    const onChangePageSize = (e:ChangeEvent<HTMLSelectElement>)=>{
             setPageSize(+e.target.value)
    }

    const [sortBy,setSortBy]=useState<string>("DESC");

    const onChangeSortBy = (e:ChangeEvent<HTMLSelectElement>)=>{
        setSortBy(e.target.value)
    }
    const {isLoading,data,isFetching} = useAuthQuery({queryKey:[`todos-page-${pagePagination}`,`${pageSize}`,`${sortBy}`],url:`/todos?pagination[pageSize]=${pageSize}&pagination[page]=${pagePagination}&sort=createdAt:${sortBy}`,config:{headers: { Authorization: `Bearer ${userData.jwt}`}}});
    console.log("API response", data);
    if(isLoading){
        return Array.from({length:15}).map((_,index)=><TodoSkeleton key={index}/>)
    }

      {/**Generate todos pagination API Sections */}

  const onGenerateTodos =async ()=>{

    for(let i= 0; i<100 ; i++){
      try {
         
        await axiosInstance.post(`/todos`,{data:{title:faker.lorem.word(5),description:"",user:[userData.user.id] }},{
          headers:
          {
              Authorization:`Bearer ${userData.jwt}`}
          });
          
    } catch (error) {
      console.log(error)
    
    }
    }
  

      }

   
    return (
        <section className="space-y-2">
        <div className="px-2 md:px-0 flex items-center justify-between max-w-lg  mx-auto my-10">
            <Button onClick={onGenerateTodos}  className="bg-indigo-600 hover:bg-indigo-500" width="w-fit">Generate Tasks</Button>
       
        <div className="flex items-center justify-between space-x-2 text-md">
          <select
            className="border-2 border-indigo-600 rounded-md p-2"
            value={sortBy}
            onChange={onChangeSortBy}
          >
            <option disabled>Sort by</option>
            <option value="ASC">Oldest</option>
            <option value="DESC">Latest</option>
          </select>
          <select
            className="border-2 border-indigo-600 rounded-md p-2"
            value={pageSize}
            onChange={onChangePageSize}
          >
            <option disabled>Page Size</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </div>
        </div>


{data?.data?.length ? (
    data.data.map(({id, title}: {id: number, title: string}) => (
        <div key={id} className="max-w-lg mx-auto flex items-center justify-between hover:bg-gray-200 duration-300 p-3 rounded-md even:bg-gray-100">
            <p className="w-full font-semibold">{id} -  {title}</p>
        </div>
    ))
) : (
    <EmptyTask title={"Empty Now"}/>
)}
        <Paginator page={pagePagination} pageCount={data.meta.pagination.pageCount} onClickPrev={onClickPrev} onClickNext={onClickNext} total={data.meta.pagination.total} isLoading={isLoading || isFetching}/>
        </section>
    )
}

export default TodoPage ;