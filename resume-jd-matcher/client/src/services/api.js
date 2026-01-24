import axios from 'axios';

const API_URL = '/api/resumes';

export const uploadResumes = async (formData) => {
    return await axios.post(`${API_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
