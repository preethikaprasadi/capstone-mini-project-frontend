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

    // Filter feedbacks for the current guide (session user)
    const currentUserFeedbacks = feedbacks.filter(feedback => feedback.guide.id === session?.user?.id);

    const visibleFeedbacks = showAll ? currentUserFeedbacks : currentUserFeedbacks.slice(0, 5);

    return (
        <div className="w-full max-w-4xl mx-auto bg-black shadow-lg rounded-lg p-8 text-white relative bg-opacity-10">
            <h2 className="text-lg font-bold text-left mb-8">Comments</h2>
            <div className="space-y-6">
                <div className="max-h-[30rem] h-[30rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-yellow-800">
                    {visibleFeedbacks.map((feedback) => (
                        <div key={feedback.id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                            <div className="flex items-start space-x-4 mb-2">
                                <img
                                    src="https://static.vecteezy.com/system/resources/thumbnails/009/210/368/small/review-icon-line-monoline-symbol-suggestions-and-critics-customer-chat-gives-an-assessment-vector.jpg"
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="text-xl font-semibold">{feedback.student.firstName} {feedback.student.lastName}</p>
                                        <p className="text-gray-400 text-sm">{new Date(feedback.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        {Array(feedback.rating).fill(0).map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 m-1" size={20} />
                                        ))}
                                        {Array(5 - feedback.rating).fill(0).map((_, i) => (
                                            <FaStar key={i + feedback.rating} className="text-gray-500 m-1" size={20} />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 mb-6 mt-6 text-lg">{feedback.content}</p>

                                    {feedback && (
                                        <div className="flex space-x-4 text-sm text-gray-400">
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
            </div>
        </div>
    );
};

export default GuideDisplayFeedbackPage;
