"use client";
import React, { useState, useEffect } from 'react';
import { fetchFeedbacks, createFeedback, deleteFeedback } from '../../service/feedback.service';
import { Feedback, FeedbackRequest } from './feedback';
import FeedbackDecision from '../components/feedbackDecision';
import FeedbackFormPage from './FeedbackFormPage';
import FeedbackDisplay from './FeedbackDisplay';
import useAxiosAuth from '@/lib/hook/useAxiosAuth';
import { useSession } from 'next-auth/react';

const HomePage = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [currentStep, setCurrentStep] = useState(1); 
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(0);
    const axiosAuth = useAxiosAuth();
    const { data: session } = useSession();
    useEffect(() => {
        loadFeedbacks();
    }, [axiosAuth]);

    const loadFeedbacks = async () => {
        try {
            const feedbackList = await fetchFeedbacks(axiosAuth);
            setFeedbacks(feedbackList);
        } catch (error) {
            console.error('Error loading feedbacks:', error);
        }
    };

    const handleFeedbackSubmit = async (feedbackRequest: FeedbackRequest) => {
        try {
            await createFeedback(axiosAuth,  feedbackRequest);
            setCurrentStep(3);  
            loadFeedbacks(); 
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const handleDeleteFeedback = async (id: string) => {
        
        try {
            const feedbackToDelete = feedbacks.find((feedback) => feedback.id === id);
            if (!feedbackToDelete) {
                console.error(`Feedback with id ${id} not found.`);
                return;
            }

            // Check ownership before deletion
            if (session?.user?.id === feedbackToDelete.student.id) {
                await deleteFeedback(axiosAuth,id);
                loadFeedbacks();
            } else {
                console.error('You are not authorized to delete this feedback.');
            }
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    return (
        <div className="bg-black  text-white w-3/5 relative left-2">
            {currentStep === 1 && (
                <FeedbackDecision setCurrentStep={setCurrentStep} feedbacks={feedbacks} />
            )}
            {currentStep === 2 && (
                <FeedbackFormPage
                    setCurrentStep={setCurrentStep}
                    feedbackText={feedbackText}
                    setFeedbackText={setFeedbackText}
                    rating={rating}
                    setRating={setRating}
                    handleFeedbackSubmit={handleFeedbackSubmit}
                />
            )}
            {currentStep === 3 && (
                <FeedbackDisplay
                    feedbacks={feedbacks}
                    handleDeleteFeedback={handleDeleteFeedback}
                />
            )}
        </div>
    );
};

export default HomePage;
