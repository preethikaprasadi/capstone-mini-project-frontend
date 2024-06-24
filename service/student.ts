import {Project} from "@/service/project.service";


export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export async function saveStudent(studentRequest: Student): Promise<Student> {
    const url: string = "http://localhost:3000/students";
    const request = new Request(url, {
        body: JSON.stringify(studentRequest),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "POST",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const student: Student = await response.json();

    return student;
}
