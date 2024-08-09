import { getToken } from '../src/utils/auth';

const apiUrl = import.meta.env.VITE_BACKEND_DOMAIN;

export const getQuestions = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/chatbot/question`, {
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
            throw new Error(`Unable to fetch questions from backend: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.log(error.message)
        throw error;
    }
};


export const getAnswer = async (questionId) => {
    try {
        const response = await fetch(`${apiUrl}/api/chatbot/answer/${questionId}`, {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': `jwt ${getToken()}`,
            // },
        }); 
        
        if (response.ok) {
            const data = await response.json();
            console.log(data.body);
            return data.body;
        } else {
            throw new Error(`Unable to fetch answer from backend: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.log(error.message)
        throw error;
    }
};
