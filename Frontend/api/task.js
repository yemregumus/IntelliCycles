import axios from 'axios';
import { getToken } from '../src/utils/auth';
import { toast } from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_BACKEND_DOMAIN;

export const createTask = async (taskData) => {
  // try {
  //   const response = await axios.post(`${apiUrl}/api/tasks/createTask`, taskData, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${getToken()}`
  //     }
  //   });
  //   return response.data;
  // } catch (error) {
  //   console.error("There was an error creating the task!", error);
  //   throw error;
  // }
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
        console.error('Failed to change password', response.status, response.statusText);
        toast.error('Failed to change password');
    }
} catch (error) {
    console.error('Failed to change password', error);
    toast.error(error.message);
}
};