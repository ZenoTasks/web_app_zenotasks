import { FaRegTrashAlt } from "react-icons/fa";
import taskService from "@/services/tasksService";
import { revalidatePath } from "next/cache";


async function DeleteButton({id,token} : {id: number,token: string}) {
    
    async function handleSubmit() {
        "use server";
        const res = await taskService.deleteTask(id,token);
        if(res) {
            revalidatePath("/");
        }
    }

    return (
        <form action={handleSubmit}>
            <button className="bg-accent p-2 rounded-lg hover:bg-opacity-90 hover:-translate-y-0.5" type="submit"><FaRegTrashAlt className="scale-100" /></button>
        </form>
    )
} 

export default DeleteButton;