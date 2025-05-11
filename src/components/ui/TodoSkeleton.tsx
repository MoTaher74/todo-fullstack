

const TodoSkeleton =()=>{
return (

<div role="status" className=" p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
    <div className="flex items-center justify-between">
        <div>
            <div className="w-52 h-10 bg-gray-300 rounded-md dark:bg-gray-400 "></div>
           
        </div>
 <div className="flex space-x-3">
 <div className="h-5 w-12 bg-gray-300 rounded-md dark:bg-gray-400 "></div>
 <div className="h-5 w-12 bg-gray-300 rounded-md dark:bg-gray-400 "></div>
 </div>
    </div>
  

</div>


)
}

export default TodoSkeleton ;