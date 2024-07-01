import axios from 'axios';
import { getToken } from '../src/utils/auth';
import { toast } from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_BACKEND_DOMAIN;

export const createActivity = async (activityData, userid, type) => {
    try {
        console.log(activityData);
        const response = await fetch(`${apiUrl}/api/activity/${type}/${userid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `jwt ${getToken()}`,
            },
            body: JSON.stringify(activityData),
        }); 
        
        if (response.ok) {
            toast.success('task created successfully');
        } else {
            console.error('Unable to create task in backend', response.ok, response.message);
            toast.error('Unable to create task');
        }
    } catch (error) {
        console.error('Backend error', error);
        toast.error(error.message);
    }
};

export const getActivitiesByUser = async (userid) => {
    try {
        const response = await fetch(`${apiUrl}/api/activity/user/${userid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `jwt ${getToken()}`,
            },
        }); 
        
        if (response.ok) {
            const data = await response.json();
            console.log(data.body);
            return data.body;
        } else {
            throw new Error(`Unable to fetch tasks from backend: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
};

export const deleteTaskById = async (taskId)=>{
    try {
        const response = await fetch(`${apiUrl}/api/activity/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `jwt ${getToken()}`,
            },
        }); 
        
        if (response.ok) {
            console.log(response.body);
        } else {
            throw new Error(`Unable to fetch tasks from backend: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
}

export const updateTaskById = async (taskData) => {
    try {
        const response = await fetch(`${apiUrl}/api/activity/${taskData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `jwt ${getToken()}`,
            },
            body: JSON.stringify(taskData),
        }); 
        
        if (!response.ok) {
            console.error('Unable to update task in backend', response.status, response.statusText);
            toast.error('Unable to update task');
        }
    } catch (error) {
        console.error('Backend error', error);
        toast.error(error.message);
    }
};