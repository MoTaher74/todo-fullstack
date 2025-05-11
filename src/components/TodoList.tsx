
import { useState, type ChangeEvent,  type FormEvent } from "react";
import useAuthQuery from "../hooks/useAuthQuery";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import TextArea from "./ui/TextArea";
import type { ITodo } from "../interface/interface";
import axiosInstance from "../config/axios.config";



const storageKey = "isLoggedIn";
const userDataString = localStorage.getItem(storageKey);
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



    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);


    const closeConfirmModal =()=>{
        setTodoToEdit({ id:0, title: '', description: '' });

        setIsOpenConfirmModal(false)
    }

    const onRemove = ()=>{
        setTodoToEdit({ id:0, title: '', description: '' });

        setIsOpenConfirmModal(false) 
    }
    const openConfirmModal = (todo: ITodo) => {
        setTodoToEdit(todo);
        setIsOpenConfirmModal(true);
      };
    /**
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
     */
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
    
       setTodoToEdit(todo);
        setIsEditOpen(true);
       
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
        try {
            const {title,description} = todoToEdit;
            const {status} = await axiosInstance.put(`/todos/${todoToEdit.id}`,{data:{title,description }},{
                headers:
                {
                    Authorization:`Bearer ${userData.jwt}`}
                });
                
                if(status === 200){
                    onCloseEdit();
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
 * @param event - The change event triggered by an input or textarea element.
 *   - `event.target.value` contains the new value of the input/textarea.
 *   - `event.target.name` specifies the name of the field being updated.
 */}
const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setTodoToEdit({...todoToEdit,[name]:value});

};

const {isLoading,data,error} = useAuthQuery({queryKey:["todoList",`${todoToEdit.id}`],url:URL,config:{headers: { Authorization: `Bearer ${userData.jwt}`}}});

if(isLoading) return <h1>Loading ....</h1>

if (error) return 'An error has occurred: ' + error.message

return (
    <section className="space-y-2">

        {

    data.map((todo:ITodo)=>(
        <div key={todo.id} className="flex items-center justify-between hover:bg-gray-200 duration-300 p-3 rounded-md even:bg-gray-100">
    <p className="w-full font-semibold">{todo.title}</p>
    <div className="flex items-center justify-end w-full space-x-3">
        <button onClick={()=>onOpenModal(todo)} >Edit</button>
        <button onClick={()=>openConfirmModal(todo)}>remove</button>
    </div>

    </div>
    ))
        }

        <Modal close={()=>console.log("close")} isOpen={isEditOpen} title="Edit this todo " >
<form className="space-y-6" onSubmit={onSubmitHandler}>
<div className="flex flex-col ">
       <Input name="title" value={todoToEdit.title} onChange={onChangeHandler}/>
       <TextArea name="description" value={todoToEdit.description} onChange={onChangeHandler}/>
       </div>
       <div className="flex items-center space-x-6 px-10">
        <button>{update? "loading":"Update"}</button>
        <button onClick={onCloseEdit}>Cancel</button>
       </div>
</form>
         </Modal>

               {/* Delete todo Modal */}
      <Modal
        isOpen={isOpenConfirmModal}
        close={closeConfirmModal}
        title="Are you sure you want to remove this todo from your store ?"
      >
        <p>"Deleting this todo will remove it permenantly from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."</p>
        <div className="flex items-center space-x-3 mt-4">
          <button  onClick={onRemove}>
            Yes , Remove
          </button>
          <button type="button" onClick={closeConfirmModal}>
            Cancel
          </button>
        </div>
      </Modal>

    </section>

)
}

export default TodoList ;

