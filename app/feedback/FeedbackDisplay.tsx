import React from 'react';
import { Feedback } from './feedback';
import { FaStar, FaTrash } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

interface DisplayFeedbackPageProps {
    feedbacks: Feedback[];
     handleDeleteFeedback: (id: string) => void;
    
}
const DisplayFeedbackPage: React.FC<DisplayFeedbackPageProps> = ({ feedbacks, handleDeleteFeedback  }) => {
    const { data: session } = useSession();

    const canDelete = (feedback: Feedback): boolean => {
        return session?.user?.id === feedback.student.id;  
    };

    return (
        <div className="inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 mb-20 ">
            <div className="w-full max-w-3xl mx-auto bg-black shadow-lg rounded-lg p-8 text-white relative">
                <h2 className="text-1xl font-bold text-left mb-4">Comments</h2>
                <div className="space-y-6">
                    <div className="max-h-[30rem] h-[30rem] overflow-y-auto pr-2">
                        {feedbacks.map((feedback) => (
                            <div key={feedback.id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                                <div className="flex items-start space-x-4 mb-2">
                                    <img 
                                        src="https://static.vecteezy.com/system/resources/thumbnails/009/210/368/small/review-icon-line-monoline-symbol-suggestions-and-critics-customer-chat-gives-an-assessment-vector.jpg" 
                                        alt="Avatar" 
                                        className="w-10 h-10 rounded-full" 
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <p className="text-md font-semibold">{feedback.student.firstName} {feedback.student.lastName}</p>
                                            <p className="text-gray-400 text-sm">{new Date(feedback.createdAt).toLocaleString()}</p>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            {Array(feedback.rating).fill(0).map((_, i) => (
                                                <FaStar key={i} color='#CFFF04' size={16} />
                                            ))}
                                            {Array(5 - feedback.rating).fill(0).map((_, i) => (
                                                <FaStar key={i + feedback.rating} className="text-gray-500" size={16} />
                                            ))}
                                        </div>
                                        <p className="text-gray-300 mb-2 text-sm">{feedback.content}</p>
                                         
                                        {canDelete(feedback) && (
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
        </div>
    );
};

export default DisplayFeedbackPage;
