import {jwtDecode} from "jwt-decode";


export const isTokenValid = () => {
    const token = sessionStorage.getItem('jwt');
    console.log('Token', token);
    if (!token) {
        console.error('Token not found');
        return false;
    }
    try{
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch (error) {
        console.error('Failed to decode token', error);
        return false;
    }
};

export const getUserIdFromToken = () => {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
        console.error('Token not found');
        return false;
    }
    try{
        const decoded = jwtDecode(token);
        return decoded._id;
    } catch (error) {
        console.error('Failed to decode token', error);
        return false;
    }
};

export const getToken = () => {
    return sessionStorage.getItem('jwt');
}

export const removeToken = () => {
    sessionStorage.removeItem('jwt');
}