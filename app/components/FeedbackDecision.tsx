
import { Feedback } from '../feedback/feedback';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { hedding } from "@/app/components/primitives";

interface DisplayFeedbackPageProps {
    feedbacks: Feedback[];
    setCurrentStep: (step: number) => void;
}

const DisplayFeedbackPage: React.FC<DisplayFeedbackPageProps> = ({ feedbacks, setCurrentStep }) => {
  
    return (
        <div className=" inset-0 flex items-center justify-center bg-black bg-opacity-75  m-2  max-h-90 " >
            <div className="w-full max-w-3xl mx-auto bg-black shadow-lg rounded-lg p-0 text-white relative max-h-90 ">
            <div className="   text-center justify-center mb-5">
        <h3 className={hedding({size:"sm"})}>Would you like to give</h3>
        <h2 className={hedding({ color: "violet",size:"md"})}> feedback?</h2>
        <br />
       
      </div>
                <div className="flex justify-around mb-5">
                    <button
                        className="w-1/4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500"
                        onClick={() => setCurrentStep(2)}
                    >
                        Yes
                    </button>
                    <button
                        className="w-1/4 bg-black border border-gray-600 text-white py-2 rounded-md hover:bg-gray-500"
                        onClick={() => setCurrentStep(3)}
                    >
                        No
                    </button>
                </div>

                <hr className="border-t-1 border-gray-500 my-3" />

                <div className="rounded-lg p-2 mb- position-relative bg-black">
                    <div className="space-y-6">
                        <h2 className="text-1xl font-bold text-left ">Comments</h2>
                        <div className="max-h-96 overflow-y-auto pr-2">
                            {feedbacks.map((feedback) => (
                                <div key={feedback.id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4 w-full">
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
                                                    <FaStar key={i}  color={ " #CFFF04"} />
                                                ))}
                                                {Array(5 - feedback.rating).fill(0).map((_, i) => (
                                                    <FaStar key={i + feedback.rating} className="text-gray-500" size={16} />
                                                ))}
                                            </div>
                                            <p className="text-gray-300 mb-2 text-sm">{feedback.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayFeedbackPage;


