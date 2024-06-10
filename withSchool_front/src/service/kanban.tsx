const url = 'http://223.130.134.181:8080';

// Fetch all projects and tasks
export const getKanbanData = async (): Promise<any> => {
    try {
        const response = await fetch(`${url}/kanban`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('Failed to fetch kanban data:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching kanban data:', error);
        throw error;
    }
};

// Create a new project
export const createProject = async (title: string): Promise<any> => {
    try {
        const response = await fetch(`${url}/kanban`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ title })
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('Failed to create project:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

// Update a project
export const updateProject = async (projectId: number, title: string): Promise<any> => {
    try {
        const response = await fetch(`${url}/kanban`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ projectId, title })
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('Failed to update project:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

// Delete a project
export const deleteProject = async (projectId: number): Promise<any> => {
    try {
        const response = await fetch(`${url}/kanban/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('Failed to delete project:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
};

// Add a task to a project
export const addTask = async (taskData: any): Promise<any> => {
    try {
        const response = await fetch(`${url}/kanban/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(taskData)
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('Failed to add task:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error adding task:', error);
        throw error;
    }
};

// Update a task
export const updateTask = async (taskData: any): Promise<any> => {
    try {
        const response = await fetch(`${url}/kanban/task`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(taskData)
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('Failed to update task:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

// Delete a task
export const deleteTask = async (taskId: number): Promise<any> => {
    try {
        const response = await fetch(`${url}/kanban/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorMessage = await response.text();
            console.error('Failed to delete task:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};