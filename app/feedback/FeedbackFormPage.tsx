import React, { FormEvent,useEffect } from 'react';
import { FeedbackRequest } from './feedback';
import { FaStar } from 'react-icons/fa';

interface FeedbackFormPageProps {
    setCurrentStep: (step: number) => void;
    feedbackText: string;
    setFeedbackText: (text: string) => void;
    rating: number;
    setRating: (rating: number) => void;
    handleFeedbackSubmit: (feedbackRequest: FeedbackRequest) => void;
}

const FeedbackFormPage: React.FC<FeedbackFormPageProps> = ({
    setCurrentStep,
    feedbackText,
    setFeedbackText,
    rating,
    setRating,
    handleFeedbackSubmit,
}) => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (feedbackText && rating) {
            const feedbackRequest: FeedbackRequest = {
                content: feedbackText,
                rating,
                student: "665a2d96825333b7ae3a6dff",
            };
            handleFeedbackSubmit(feedbackRequest);
            setCurrentStep(3);
        } else {
            alert('Please provide feedback and a rating.');
        }
    };
      useEffect(() => {
        document.body.style.overflow = 'hidden'; 

        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    return (
        <div className=" inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-hidden mb-10">
            <div className="w-full mx-auto bg-gray-900 shadow-lg rounded-lg p-9 text-white overflow-hidden">
                <h2 className="text-xl font-bold text-center mb-4">What was it like working with this guide?</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <textarea
                        placeholder="Type your comment here..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        required
                        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <h4 className="text-lg font-semibold mb-2 text-gray-400">Rate to the guide</h4>
                    <div className="flex space-x-2 mb-4">
                        {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                                <label key={index} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="rating"
                                        className="hidden"
                                        value={starValue}
                                        onClick={() => setRating(starValue)}
                                    />
                                    <FaStar
                                        className="text-4xl ml-5"
                                        color={starValue <= rating ? "#CFFF04" : "#4b5563" } 
                                    />
                                </label>
                            );
                        })}
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition-colors duration-200"
                    >
                        Send Feedback
                    </button>
                </form>
            </div>
        </div>
    );

};

export default FeedbackFormPage;
