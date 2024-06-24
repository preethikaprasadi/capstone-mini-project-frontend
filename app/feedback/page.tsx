"use client";
import React, { useState, useEffect } from 'react';
import { fetchFeedbacks, createFeedback, deleteFeedback } from '../../service/feedback.service';
import { Feedback, FeedbackRequest } from './feedback';
import FeedbackDecision from '../components/FeedbackDecision';
import FeedbackFormPage from './FeedbackFormPage';
import FeedbackDisplay from './FeedbackDisplay';

const HomePage = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [currentStep, setCurrentStep] = useState(1); 
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        loadFeedbacks();
    }, []);

    const loadFeedbacks = async () => {
        try {
            const feedbackList = await fetchFeedbacks();
            setFeedbacks(feedbackList);
        } catch (error) {
            console.error('Error loading feedbacks:', error);
        }
    };

    const handleFeedbackSubmit = async (feedbackRequest: FeedbackRequest) => {
        try {
            await createFeedback(feedbackRequest);
            setCurrentStep(3);  
            loadFeedbacks(); 
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const handleDeleteFeedback = async (id: string) => {
        try {
            await deleteFeedback(id);
            loadFeedbacks();  
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
