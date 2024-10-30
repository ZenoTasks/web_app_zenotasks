import taskService from "@/services/tasksService";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateTaskForm() {
    const session = await getServerSession(options);

    async function handleSubmit(formData: FormData) {
        "use server";
        const token = session?.user?.idToken as string;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const res = taskService.createTask(title, description,token);
        redirect("/");
    }

    return (
        <div className="w-full text-foreground font-bold flex flex-col">
            <h1 className="text-3xl font-bold">Create Task</h1>
            <form action={handleSubmit}>
                <div className="flex flex-col gap-2 my-4">
                    <label htmlFor="title">Title</label>
                    <input
                        className="rounded-lg p-2 bg-primary text-foreground"
                        type="text"
                        name="title"    
                        id="title"
                        required
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="rounded-lg p-2 bg-primary text-foreground"
                        name="description"
                        id="description"
                        required
                    />
                    <button className="bg-secondary text-foreground rounded-lg p-2 w-[10%] place-self-center hover:bg-opacity-90 hover:-translate-y-0.5" type="submit">Submit</button>
                </div>
            </form>
            <a href="/" className="place-self-center w-[10%] mx-auto"><button className="bg-accent text-foreground rounded-lg p-2 w-full hover:bg-opacity-90 hover:-translate-y-0.5">Cancel</button></a>
        </div>
    );
}