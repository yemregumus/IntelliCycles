import axios from 'axios';
import { getToken } from '../src/utils/auth';
import { toast } from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_BACKEND_DOMAIN;

export const createTask = async (taskData) => {
    try {
        const response = await fetch(`${apiUrl}/api/tasks/createTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `jwt ${getToken()}`,
            },
            body: JSON.stringify(taskData),
        }); 
        
        if (response.ok) {
            toast.success('task created successfully');
        } else {
            console.error('Unable to create task in backend', response.status, response.statusText);
            toast.error('Unable to create task');
        }
    } catch (error) {
        console.error('Backend error', error);
        toast.error(error.message);
    }
};

export const getTasksByUser = async (userid) => {
    try {
        const response = await fetch(`${apiUrl}/api/tasks/user/${userid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `jwt ${getToken()}`,
            },
        }); 
        
        if (response.ok) {
            const data = await response.json();
            return data.body.tasks;
        } else {
            throw new Error(`Unable to fetch tasks from backend: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
};
