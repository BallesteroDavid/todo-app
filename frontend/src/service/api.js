const API_URL = import.meta.env.VITE_API_URL;

//recuperation de toutes les tasks
export async function getAllTasks() {
    const response = await fetch(`${API_URL}/tasks`,{
        method: "GET"
    });
    
    const data = await response.json();

    return data;
};

//recuperation d'une task
export async function getTasks(id) {
    const response= await fetch(`${API_URL}/task/${id}`,{
        method: "GET",
    });

    const data = await response.json();

    return data;
};

//mise à jour d'une task
export async function updateTask(id, title, status) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, status })
    });

    const data = await response.json();
    return data;
};

//suppression d'une task
export async function deleteTask(id) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
    });

    if (response.status === 204) {
        return { success: true };
    }

    const data = await response.json();
    return data;
};

//ajout d'une task
export async function addTask(title, status = 'A faire') {
    const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, status })
    });

    const data = await response.json();
    return data;
};