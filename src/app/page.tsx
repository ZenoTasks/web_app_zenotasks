import { getServerSession } from "next-auth";
import options from "./api/auth/[...nextauth]/options";
import taskService from "../services/tasksService";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/deleteButton";
import StatusBox from "@/components/StatusBox";
import OrderSorterButtons from "@/components/OrderSorterButtons";

export default async function Home({searchParams}: {searchParams: Promise<{ [key: string]: string | undefined }>}) {
  const session = await getServerSession(options);
  const token: string = session?.user?.idToken as string;

  const searchParamsObj = await searchParams;
  const limit = searchParamsObj.limit ? parseInt(searchParamsObj.limit) : 10;
  const page = searchParamsObj.page ? parseInt(searchParamsObj.page) : 0;
  const order_by = searchParamsObj.order_by ? searchParamsObj.order_by : "id";
  const order_direction = searchParamsObj.order_direction ? searchParamsObj.order_direction : "asc";
  const orderBys = ["id","title","date","checked"];
  const orderDirections = ["asc","desc"];
  if(page < 0 || limit < 5 || !orderBys.includes(order_by) || !orderDirections.includes(order_direction)) {
    redirect("/");
  }

  const tasks = await taskService.getTasks(limit,page,order_by,order_direction,token);

  console.log(tasks);


  return (
    <div className="w-full py-5 px-[20%]">
        <div className="w-full flex justify-between items-center">
          <a href="/newtask"><button className="bg-accent rounded-lg p-1 font-bold my-2 hover:bg-opacity-90 hover:-translate-y-0.5">New Task</button></a>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">Order by:</p>
            <OrderSorterButtons page={page} limit={limit} order_by={order_by} order_direction={order_direction} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {tasks && tasks.map((task:any) => (
            <div className="w-full bg-secondary rounded-lg p-2 flex justify-between items-center" key={task.id}>
              <div>
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <p className="w-full">{task.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <p>{task.created_at}</p>
                <StatusBox task={task} token={token} />
                <DeleteButton id={task.id} token={token} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 my-2 justify-center w-full">
          <a href={`/?page=${page-1}&limit=${limit}&order_by=${order_by}&order_direction=${order_direction}`}><button className="bg-accent p-2 rounded-lg hover:bg-opacity-90 hover:-translate-y-0.5">Previous Page</button></a>
          <a href={`/?page=${page+1}&limit=${limit}&order_by=${order_by}&order_direction=${order_direction}`}><button className="bg-accent p-2 rounded-lg hover:bg-opacity-90 hover:-translate-y-0.5">Next Page</button></a>
        </div>
    </div>
  );
}
