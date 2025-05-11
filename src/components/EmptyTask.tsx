interface IProps{
    title:string
}

const EmptyTask =({title}:IProps)=>{
return (
<section className="flex flex-col items-center justify-between ">
    <img src="/src/assets/task.svg" alt="tasks" className="w-20 h-30 md:w-52 md:h-60" />
    <h1 className="text-lg font-semibold mt-10 text-indigo-500">{title}</h1>
</section>

)
}

export default EmptyTask ;