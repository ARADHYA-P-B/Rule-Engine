import axios from 'axios';

const API_URL = 'https://rule-engine-server.onrender.com'; // Update the base URL as needed


export const fetchRules = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching rules:', error);
        throw error; 
    }
};


export const addRule = async (newRule) => {
    try {
        const response = await axios.post(API_URL, newRule);
        return response.data; 
    } catch (error) {
        console.error('Error adding rule:', error);
        throw error; 
    }
};


export const fetchRuleById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching rule by ID:', error);
        throw error; 
    }
};


export const updateRule = async (id, updatedRule) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedRule);
        return response.data; 
    } catch (error) {
        console.error('Error updating rule:', error);
        throw error; 
    }
};


export const deleteRule = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`); 
    } catch (error) {
        console.error('Error deleting rule:', error);
        throw error; 
    }
};
