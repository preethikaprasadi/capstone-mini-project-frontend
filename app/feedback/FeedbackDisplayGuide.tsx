import React, { useState } from 'react';
import { FaStar, FaTrash } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { Feedback } from './feedback';

interface DisplayFeedbackPageProps {
    feedbacks: Feedback[];
    handleDeleteFeedback: (id: string) => void;
}

const GuideDisplayFeedbackPage: React.FC<DisplayFeedbackPageProps> = ({ feedbacks, handleDeleteFeedback }) => {
    const { data: session } = useSession();
    const [showAll, setShowAll] = useState(false);

    const currentUserFeedbacks = feedbacks.filter(feedback => feedback.guide.id === session?.user?.id);
    const visibleFeedbacks = showAll ? currentUserFeedbacks : currentUserFeedbacks.slice(0, 5);

    const handleToggleShowAll = () => {
        setShowAll(prev => !prev);
    };

    return (
        <div className="w-full max-w-5xl mx-auto shadow-lg rounded-lg p-8 text-white relative bg-opacity-10">
            <h2 className="text-2xl font-bold text-left mb-8">Comments</h2>
            <div className="space-y-6">
                <div className={`max-h-[40rem] ${showAll ? 'overflow-visible' : 'overflow-y-auto'} transition-all duration-300 ease-in-out`}>
                    {visibleFeedbacks.map((feedback) => (
                        <div key={feedback.id} className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 m-6">
                            <div className="flex items-start space-x-6 mb-4">
                                <img
                                    src="https://static.vecteezy.com/system/resources/thumbnails/009/210/368/small/review-icon-line-monoline-symbol-suggestions-and-critics-customer-chat-gives-an-assessment-vector.jpg"
                                    alt="Avatar"
                                    className="w-16 h-16 rounded-full"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between mb-4">
                                        <p className="text-2xl font-semibold">{feedback.student.firstName} {feedback.student.lastName}</p>
                                        <p className="text-gray-400 text-base">{new Date(feedback.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        {Array(feedback.rating).fill(0).map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 m-1" size={24} />
                                        ))}
                                        {Array(5 - feedback.rating).fill(0).map((_, i) => (
                                            <FaStar key={i + feedback.rating} className="text-gray-500 m-1" size={24} />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 mb-6 mt-6 text-xl">{feedback.content}</p>

                                    {feedback && (
                                        <div className="flex space-x-4 text-base text-gray-400">
                                            <button
                                                onClick={() => handleDeleteFeedback(feedback.id)}
                                                className="flex items-center space-x-1 hover:text-white"
                                            >
                                                <FaTrash /> <span>Delete</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {currentUserFeedbacks.length > 5 && (
                    <button
                        onClick={handleToggleShowAll}
                        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
                    >
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default GuideDisplayFeedbackPage;
