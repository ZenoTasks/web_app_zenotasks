const taskService = {

    
    async getTasks(limit=10,page=0,token: string) {
        const res = await fetch(`http://api:8000/api/tasks?limit=${limit}&offset=${page*limit}`, {
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
        const res = await fetch("http://api:8000/api/tasks", {
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
    }
}

export default taskService;