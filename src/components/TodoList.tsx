
import { useState, type ChangeEvent,  type FormEvent } from "react";
import useAuthQuery from "../hooks/useAuthQuery";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import TextArea from "./ui/TextArea";
import type { ITodo } from "../interface/interface";
import axiosInstance from "../config/axios.config";
import TodoSkeleton from "./ui/TodoSkeleton";
import Button from "./ui/Button";
import Spinner from "./ui/Spinner";
import EmptyTask from "./EmptyTask";


{/**
 * Parses a JSON string to retrieve user data or returns `null` if the string is invalid or undefined.
 *
 * @remarks
 * This code snippet checks if `userDataString` is defined and attempts to parse it as JSON.
 * If the parsing is successful, it returns the parsed object; otherwise, it returns `null`.
 *
 * @example
 * ```tsx
 * const userDataString = '{"name": "John", "age": 30}';
 * const userData = userDataString ? JSON.parse(userDataString) : null;
 * console.log(userData); // Output: { name: "John", age: 30 }
 *
 * const invalidUserDataString = "invalid JSON";
 * const invalidUserData = invalidUserDataString ? JSON.parse(invalidUserDataString) : null;
 * console.log(invalidUserData); // Output: null
 * ```
 *
 * @param userDataString - A string containing JSON data or `undefined`.
 * @returns The parsed JSON object if valid, or `null` if the string is invalid or undefined.
 */}
const storageKey = "isLoggedIn";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
const URL = "/users/me?populate=todos";

{/**
 * A component that displays a list of todos, with the ability to edit an individual todo.
 * 
 * @function
 * @returns {ReactElement} A React component with a list of todos and an edit modal.
 */}
const TodoList =()=>{
{    /**
     * State to manage the visibility of the edit modal or component.
     * 
     * @constant {boolean} isEditOpen - Indicates whether the edit modal is open (`true`) or closed (`false`).
     * @function setIsEditOpen - Function to update the `isEditOpen` state.
     */}
    const [isEditOpen,setIsEditOpen] = useState(false);




 {   /**
     * State variable to track whether an update is required.
     * 
     * @constant
     * @type {boolean}
     * @default false
     * 
     * @remarks
     * - `update` is a boolean state that determines if an update action should be triggered.
     * - `setUpdate` is the corresponding state updater function to toggle the `update` state.
     * 
     * @example
     * ```tsx
     * // To trigger an update:
     * setUpdate(true);
     * 
     * // To reset the update state:
     * setUpdate(false);
     * ```
     */}

    const[update,setUpdate] =useState(false)

{ /**
     * State to manage the todo item currently being edited.
     * 
     * @type {ITodo} - The structure of the todo item includes:
     *   - `id` (number): The unique identifier for the todo item.
     *   - `title` (string): The title of the todo item.
     *   - `description` (string): A detailed description of the todo item.
     * 
     * @default 
     *   - `id`: 0
     *   - `title`: An empty string.
     *   - `description`: An empty string.
     */}
    const [todoToEdit,setTodoToEdit] = useState<ITodo>({
        id: 0,
        documentId:'',
        title: '',
        description: ''

    });



  
   { /**
     * Close the edit modal and reset the todo to be edited.
     * 
     */}
    const onCloseEdit = ()=>{
        setTodoToEdit({ id:0, title: '', description: '' });   
        setIsEditOpen(false)
    }


{ /**
    * Opens the edit modal and sets the todo to be edited.
    * @param todo The todo to be edited.
    */}

    const onOpenModal = (todo:ITodo)=>{
        console.log("Todo to edit:", todo);
       setTodoToEdit(todo);
        setIsEditOpen(true);
       
    }

    // ------------


    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

    const closeConfirmModal =()=>{
      setTodoToEdit({ id:0,documentId:'0' ,title: '', description: '' });

      setIsOpenConfirmModal(false)
  }
  const openConfirmModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsOpenConfirmModal(true);
  };
{  /**
   * Handles the removal of a todo item by sending a DELETE request to the server.
   * 
   * @async
   * @function
   * @throws Will log an error to the console if the request fails.
   * 
   * @description
   * This function sends an HTTP DELETE request to remove a specific todo item identified
   * by its `documentId`. If the request is successful and returns a status of 204 (No Content),
   * it closes the confirmation modal and increments the query version to trigger a re-fetch
   * or update of the todo list.
   * 
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */}
  const onRemove = async () => {
    try {
      const { status } = await axiosInstance.delete(`/todos/${todoToEdit.documentId}`, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
      if (status === 204) {
        closeConfirmModal();
        setQueryVersion((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

    {/**  Add for todos or task in project  */}
    
    const [isTodoAddModal, setIsTodoAddModal] = useState({
      title:"",
      description:""
    });
  

    const [openAddNewTodoModal,setOpenAddNewTodoModal] = useState(false);

    const closeAddNewTodoModal = ()=> {setOpenAddNewTodoModal(false);setIsTodoAddModal({title:"",description:""})}
    const openAddNewTodoModalFun = ()=>setOpenAddNewTodoModal(true);
    

{    /**
     * Handles the change event for input or textarea elements in the "Add Task" modal.
     * Updates the state of the `isTodoAddModal` object with the new value for the corresponding field.
     *
     * @param event - The change event triggered by the input or textarea element.
     *   - `event.target.value` contains the new value of the input or textarea.
     *   - `event.target.name` specifies the name of the field being updated.
     */}
    const onChangeHandlerAddTask = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value, name } = event.target;
      setIsTodoAddModal({...isTodoAddModal,[name]:value});
  
  };

{    /**
     * Handles the submission of the form to add a new task.
     * 
     * This function is triggered when the form is submitted. It prevents the default
     * form submission behavior, extracts the title and description from the `isTodoAddModal` state,
     * and sends a POST request to the `/todos` endpoint to create a new task. If the request is
     * successful, it closes the "Add New Todo" modal. The `setUpdate` state is used to manage
     * the loading state during the operation.
     * user:[userData.user.id] => used for pushed add task in page bady 
     * 
     * @param e - The form submission event of type `FormEvent<HTMLFormElement>`.
     * 
     * @throws Logs any errors that occur during the API request to the console.
     */}
    const onSubmitHandlerAddTask =async (e:FormEvent<HTMLFormElement>)=>{

      setUpdate(true)
      e.preventDefault();

      try {
          const {title,description} = isTodoAddModal;
          const {status} = await axiosInstance.post(`/todos`,{data:{title,description,user:[userData.user.id] }},{
              headers:
              {
                  Authorization:`Bearer ${userData.jwt}`}
              });
              
              if(status === 200 || status ===201){
                closeAddNewTodoModal();
                setQueryVersion(prev =>prev +1)
              }
      } catch (error) {
          console.log(error)
      }finally{
          setUpdate(false)
      }
  }



{   /**
    * Handles the submission of the edit form for a todo item.
    * 
    * This function is triggered when the form is submitted. It prevents the default
    * form submission behavior, sets the update state to `true`, and sends an HTTP PUT
    * request to update the todo item on the server. If the update is successful, it
    * closes the edit modal. The function also handles errors and ensures the update
    * state is reset to `false` after the operation.
    * 
    * @param e - The form submission event of type `FormEvent<HTMLFormElement>`.
    * 
    * @example
    * ```tsx
    * <form onSubmit={onSubmitHandler}>
    *   <input
    *     type="text"
    *     value={todoToEdit.title}
    *     onChange={(e) => setTodoToEdit({ ...todoToEdit, title: e.target.value })}
    *   />
    *   <textarea
    *     value={todoToEdit.description}
    *     onChange={(e) => setTodoToEdit({ ...todoToEdit, description: e.target.value })}
    *   />
    *   <button type="submit">Save</button>
    * </form>
    * ```
    * 
    * @remarks
    * - Ensure `axiosInstance` is properly configured with the base URL of your API.
    * - `todoToEdit` should contain the `id`, `title`, and `description` of the todo item being edited.
    * - `userData.jwt` must contain a valid JWT token for authentication.
    * - `onCloseEdit` should be a function that closes the edit modal or resets the edit state.
    * - `setUpdate` is a state setter function to indicate the loading state during the update process.
    */
}
    const onSubmitHandler =async (e:FormEvent<HTMLFormElement>)=>{

        setUpdate(true)
        e.preventDefault();
        console.log("Todo ID to update:", todoToEdit.id);
        try {
            const {title,description} = todoToEdit;
            const {status} = await axiosInstance.put(`/todos/${todoToEdit.documentId}`,{data:{title,description }},{
                headers:
                {
                    Authorization:`Bearer ${userData.jwt}`}
                });
                
                if(status === 200){
                    onCloseEdit();
                    setQueryVersion((prev) => prev + 1);
                }
        } catch (error) {
            console.log(error)
        }finally{
            setUpdate(false)
        }
    }


{/**
 * Handles the change event for input and textarea elements.
 * Updates the `todoToEdit` state with the new value for the corresponding field.
 *
 * @param event - The change event triggered by the input or textarea element.
 *   - `event.target.value`: The new value entered by the user.
 *   - `event.target.name`: The name attribute of the input or textarea element, used as the key to update the state.
 */}
const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setTodoToEdit({...todoToEdit,[name]:value});

};

// ------------------------------------------------

  const [queryversion,setQueryVersion]=useState(1);

{/**
 * Custom hook to fetch the todo list data using the `useAuthQuery` hook.
 *
 * @constant
 * @property {boolean} isLoading - Indicates whether the data is currently being loaded.
 * @property {any} data - The fetched data for the todo list. The structure of this data depends on the API response.
 * @property {any} error - Contains error information if the query fails.
 *
 * @function useAuthQuery
 * @param {object} options - The options object for the query.
 * @param {string[]} options.queryKey - An array representing the unique key for the query. 
 *                                      In this case, it includes "todoList" and the `queryversion`.
 * @param {string} options.url - The API endpoint URL to fetch the todo list data.
 * @param {object} options.config - Configuration object for the query.
 * @param {object} options.config.headers - HTTP headers for the request.
 * @param {string} options.config.headers.Authorization - The authorization header containing the JWT token.
 *
 * @example
 * // Example usage:
 * const { isLoading, data, error } = useAuthQuery({
 *   queryKey: ["todoList", `${queryversion}`],
 *   url: URL,
 *   config: {
 *     headers: {
 *       Authorization: `Bearer ${userData.jwt}`
 *     }
 *   }
 * });
 *
 * @remarks
 * - Ensure that `queryversion` and `URL` are properly defined before using this hook.
 * - The `userData.jwt` must contain a valid JWT token for authentication.
 * - Handle the `isLoading` and `error` states appropriately in your component to provide a good user experience.
 */}
const {isLoading,data,error} = useAuthQuery({queryKey:["todoList",`${queryversion}`],url:URL,config:{headers: { Authorization: `Bearer ${userData.jwt}`}}});

if(isLoading){
    return Array.from({length:5}).map((_,index)=><TodoSkeleton key={index}/>)
}

if (error) return 'An error has occurred: ' + error.message

return (
    <section className="space-y-2">
        
        <div className="w-fit mx-auto my-10">
            <Button onClick={openAddNewTodoModalFun} className="bg-indigo-600 hover:bg-indigo-400" width="w-full">Add New Task</Button>
        </div>

{data.length?data.map((todo:ITodo)=>(
        <div key={todo.id} className="max-w-lg mx-auto flex items-center justify-between hover:bg-gray-200 duration-300 p-3 rounded-md even:bg-gray-100">
  
   <p className="w-full font-semibold">📝 {todo.title}</p>
  
    <div className="flex items-center justify-end w-full space-x-3">
        <Button width="w-fit" className="bg-indigo-600 hover:bg-indigo-400" onClick={()=>onOpenModal(todo)} >Edit</Button>
        <Button width="w-fit" className="bg-red-500 hover:bg-red-800" onClick={()=>openConfirmModal(todo)}>remove</Button>
    </div>

    </div>
    )):<EmptyTask title="No Tasks Yet !"/>
        }
      
{/** -------- this is add task Modal */}
        <Modal close={closeAddNewTodoModal} isOpen={openAddNewTodoModal} title="Add New Tasks " >
<form className="space-y-6" onSubmit={onSubmitHandlerAddTask}>
    <div className="flex flex-col ">
       <Input name="title" value={isTodoAddModal.title} onChange={onChangeHandlerAddTask}/>
       <TextArea name="description" value={isTodoAddModal.description} onChange={onChangeHandlerAddTask}/>
    </div>
    <div className="flex items-center space-x-6 px-10">
        <Button className="bg-indigo-600 hover:bg-indigo-400" width="w-full">{update? <Spinner/>:"Add Task"}</Button>
        <Button type="button" onClick={closeAddNewTodoModal} className="bg-gray-600 hover:bg-gray-900" width={"w-full"}>Cancel</Button>
       </div>

</form>
         </Modal>

         {/* ------------------------------ */}
        <Modal close={()=>console.log("close")} isOpen={isEditOpen} title="Edit this todo " >
<form className="space-y-6" onSubmit={onSubmitHandler}>
<div className="flex flex-col ">
       <Input name="title" value={todoToEdit.title} onChange={onChangeHandler}/>
       <TextArea name="description" value={todoToEdit.description} onChange={onChangeHandler}/>
       </div>
       <div className="flex items-center space-x-6 px-10">
        <Button className="bg-indigo-600 hover:bg-indigo-400" width="w-full">{update? <Spinner/>:"Update"}</Button>
        <Button type="button" onClick={onCloseEdit} className="bg-gray-600 hover:bg-gray-900" width={"w-full"}>Cancel</Button>
       </div>
</form>
         </Modal>

               {/* Delete todo Modal */}
      <Modal
        isOpen={isOpenConfirmModal}
        close={closeConfirmModal}
        title="Are you sure you want to remove this Task ?"
      >
        <p >Deleting this Task will remove it permenantly from your inventory. Please make sure this is the intended action.</p>
        <div className="flex items-center space-x-3 mt-4">
          <Button className="bg-red-800 hover:bg-red-900" width="w-full"  onClick={()=>onRemove()}>
            Yes , Remove
          </Button>
          <Button width="w-fit" className="bg-gray-400 hover:bg-gray-700" type="button" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>

     

    </section>

)
}

export default TodoList ;

