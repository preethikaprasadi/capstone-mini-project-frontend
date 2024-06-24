export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Feedback {
    id: string;
    content: string;
    student: Student;
    rating: number;
    createdAt: string;
}

export interface FeedbackRequest {
    content: string;
    student: string;
    rating: number;
}
