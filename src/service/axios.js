import axios from 'axios';

const URL = 'http://localhost:5000';

export const addUser = async (data) => { 
    try {
        return await axios.post(`${URL}/`, data)
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (id, data) => { 
    console.log("AXIOS", data);
    try {
        return await axios.patch(`${URL}/${id}`, data)
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (id) => { 
    try {
        return await axios.delete(`${URL}/${id}`)
    } catch (error) {
        console.log(error);
    }
}