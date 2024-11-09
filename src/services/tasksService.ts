
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const taskService = {

    
    async getTasks(limit=10,page=0,order_by="id",order_direction="asc",token: string) {
        console.log("================================",BASE_URL)
        const res = await fetch(`${BASE_URL}/tasks?limit=${limit}&offset=${page*limit}&order_by=${order_by}&order_direction=${order_direction}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if(res.status === 200) {
            return res.json()
        }
        return []
    },
    async createTask(title: string, description: string,token: string) {
        const res = await fetch(`${BASE_URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title:title,
                description:description
            })
        }).then(res => res.json())
        return res
    },

    async deleteTask(id: number,token: string) {
        const res = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if(res.status === 200) {
            return res.json()
        }

        return ""
    },
    
    async updateTask(id: number,task: any, token: string) {
        console.log("------------",task)
        const res = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(task)
        })
        if(res.status === 200) {
            return res.json()
        }
        return ""
    }
}

export default taskService;