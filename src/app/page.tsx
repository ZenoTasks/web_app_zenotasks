import { getServerSession } from "next-auth";
import options from "./api/auth/[...nextauth]/options";
import taskService from "../services/tasksService";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/deleteButton";
import StatusBox from "@/components/StatusBox";

export default async function Home({searchParams}: {searchParams: Promise<{ [key: string]: string | undefined }>}) {
  const session = await getServerSession(options);
  const token: string = session?.user?.idToken as string;
  const searchParamsObj = await searchParams;
  const limit = searchParamsObj.limit ? parseInt(searchParamsObj.limit) : 10;
  const page = searchParamsObj.page ? parseInt(searchParamsObj.page) : 0;
  if(page < 0 || limit < 5) {
    redirect("/");
  }
  const tasks = await taskService.getTasks(limit,page,token);

  console.log(session?.user.idToken);


  return (
    <div className="w-full py-5 px-[20%]">
        <a href="/newtask"><button className="bg-accent rounded-lg p-1 font-bold my-2 hover:bg-opacity-90 hover:-translate-y-0.5">New Task</button></a>
        <div className="flex flex-col gap-1">
          {tasks && tasks.map((task:any) => (
            <div className="w-full bg-secondary rounded-lg p-2 flex justify-between items-center" key={task.id}>
              <div>
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <p className="w-full">{task.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBox task={task} token={token} />
                <DeleteButton id={task.id} token={token} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 my-2 justify-center w-full">
          <a href={`/?page=${page-1}`}><button className="bg-accent p-2 rounded-lg hover:bg-opacity-90 hover:-translate-y-0.5">Previous Page</button></a>
          <a href={`/?page=${page+1}`}><button className="bg-accent p-2 rounded-lg hover:bg-opacity-90 hover:-translate-y-0.5">Next Page</button></a>
        </div>
    </div>
  );
}
