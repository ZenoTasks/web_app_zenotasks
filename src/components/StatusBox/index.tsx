import { revalidatePath } from "next/cache";
import taskService from "@/services/tasksService";
import { FaCheck } from "react-icons/fa";



async function StatusBox({task,token} : {task: any,token: string}) {
    async function handleSubmit() {
        "use server";
        task.done = !task.done;
        const res = await taskService.updateTask(task.id as number,task,token);
        if(res) {
            revalidatePath("/");
        }
    }

    return (
        <form action={handleSubmit}>
            {task.done ? 
            <button className="bg-accent p-2 rounded-lg hover:bg-opacity-90 hover:-translate-y-0.5" type="submit"><FaCheck className="scale-100" /></button>
            :
            <button className="bg-white p-2 rounded-lg hover:bg-opacity-90 hover:-translate-y-0.5" type="submit"><FaCheck className="scale-100 opacity-0"/></button>
            }
        </form>
    )
}

export default StatusBox;