"use client";
import { useRouter } from "next/navigation";


function OrderSorterButtons({page,limit,order_by,order_direction}: {page: number,limit: number,order_by: string,order_direction: string}) {
    const router = useRouter();

    return (
        <div>
            <select className="rounded-lg mr-2 p-2 bg-primary text-foreground" onChange={(e) => {
                router.push(`/?page=${page}&limit=${limit}&order_by=${e.target.value}&order_direction=${order_direction}`);
            }}
                defaultValue={order_by}
            >
                <option value="id">ID</option>
                <option value="title">Title</option>
                <option value="date">Date</option>
                <option value="checked">Checked</option>
            </select>
            <select className="rounded-lg p-2 bg-primary text-foreground" onChange={(e) => {
                router.push(`/?page=${page}&limit=${limit}&order_by=${order_by}&order_direction=${e.target.value}`);    
            }}
                    defaultValue={order_direction}
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    )
}

export default OrderSorterButtons;