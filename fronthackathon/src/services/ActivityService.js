import axios from 'axios';

const getAllActivities = async (page = 0, size = 10) => {
    try {
        const response = await axios.get('/api/activity/all', {
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all activities:', error);
        throw error;
    }
};

const getActivityById = async (id) => {
    try {
        const response = await axios.get(`/api/activity/id/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching activity by ID ${id}:`, error);
        throw error;
    }
};

const getActivitiesByType = async (type, page = 0, size = 10) => {
    try {
        const response = await axios.get(`/api/activity/type/${type}`, {
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching activities by type ${type}:`, error);
        throw error;
    }
};

const getActivitiesLikeText = async (textActivity, page = 0, size = 10) => {
    try {
        const response = await axios.get(`/api/activity/full-text/${textActivity}`, {
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching activities like text "${textActivity}":`, error);
        throw error;
    }
};
