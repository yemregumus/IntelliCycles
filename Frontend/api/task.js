import axios from 'axios';

export const createTask = async (taskData) => {
  try {
    const response = await axios.post('/api/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error("There was an error creating the task!", error);
    throw error;
  }
};