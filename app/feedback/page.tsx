"use client";
import React, { useState, useEffect } from 'react';
import { fetchFeedbacks, createFeedback, deleteFeedback } from '../../service/feedback.service';
import { Feedback, FeedbackRequest } from './feedback';
import DecisionPage from './DecisionPage';
import FeedbackFormPage from './FeedbackFormPage';
import DisplayFeedbackPage from './DisplayFeedbackPage';

const HomePage = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [currentStep, setCurrentStep] = useState(1); // 1 for Decision, 2 for Form, 3 for Display
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
        <div className="bg-black min-h-screen text-white">
            {currentStep === 1 && (
                <DecisionPage setCurrentStep={setCurrentStep} feedbacks={feedbacks} />
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
                <DisplayFeedbackPage
                    feedbacks={feedbacks}
                    handleDeleteFeedback={handleDeleteFeedback}
                />
            )}
        </div>
    );
};

export default HomePage;
