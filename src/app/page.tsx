import { getServerSession } from "next-auth";
import options from "./api/auth/[...nextauth]/options";
import taskService from "../services/tasksService";

export default async function Home() {
  const session = await getServerSession(options);
  const token = session?.user?.idToken as string;
  const tasks = await taskService.getTasks(10,0,token);

  return (
    <div className="w-full py-5 px-[20%]">
        <a href="/newtask"><button className="bg-accent rounded-lg p-1 font-bold my-2 hover:bg-opacity-90 hover:-translate-y-0.5">New Task</button></a>
        <div className="flex flex-col gap-1">
          {tasks && tasks.map((task:any) => (
            <div className="w-full bg-secondary rounded-lg p-2" key={task.id}>
              <h1 className="text-2xl font-bold">{task.title}</h1>
              <p className="w-full">{task.description}</p>
            </div>
          ))}
        </div>
    </div>
  );
}
