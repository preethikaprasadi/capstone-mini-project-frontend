import axios from 'axios';
import { Feedback, FeedbackRequest } from '../app/feedback/feedback';

const API_URL = 'http://localhost:3000/feedbacks'; 

export const fetchFeedbacks = async (): Promise<Feedback[]> => {
    const response = await axios.get(API_URL);
    return response.data.map((feedback: any) => ({
        ...feedback,
        student: {
            id: feedback.student.id,
            firstName: feedback.student.firstName,
            lastName: feedback.student.lastName,
            email: feedback.student.email,
        }
    }));
};

export const createFeedback = async (feedback: FeedbackRequest): Promise<Feedback> => {
    const response = await axios.post(API_URL, feedback);
    return response.data;
};

export const deleteFeedback = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Failed to delete feedback:', error);
        throw error;
    }
};
