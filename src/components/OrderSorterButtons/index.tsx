"use client";
import { useRouter } from "next/navigation";


function OrderSorterButtons({page,limit,order_by,order_direction}: {page: number,limit: number,order_by: string,order_direction: string}) {
    const router = useRouter();

    return (
        <div>
            <select className="rounded-lg mr-2 p-2 bg-primary text-foreground" onChange={(e) => {
                router.push(`/?page=${page}&limit=${limit}&order_by=${e.target.value}&order_direction=${order_direction}`);
            }}>
                <option value="id" selected={order_by === "id"}>ID</option>
                <option value="title" selected={order_by === "title"}>Title</option>
                <option value="date" selected={order_by === "date"}>Date</option>
                <option value="checked" selected={order_by === "checked"}>Checked</option>
            </select>
            <select className="rounded-lg p-2 bg-primary text-foreground" onChange={(e) => {
                router.push(`/?page=${page}&limit=${limit}&order_by=${order_by}&order_direction=${e.target.value}`);    
            }}
            >
                <option value="asc" selected={order_direction === "asc"}>Ascending</option>
                <option value="desc" selected={order_direction === "desc"}>Descending</option>
            </select>
        </div>
    )
}

export default OrderSorterButtons;