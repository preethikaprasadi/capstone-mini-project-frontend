"use client";
import { getAllSpecificProject, Project } from '@/service/project.service';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function Page() {
    const [projects, setProjects] = useState<Project[]>([]);
    const { data: session } = useSession();
    const studentId = session?.user?.id;

    useEffect(() => {
        if (studentId) {
            getAllSpecificProject(studentId)
                .then((response) => {
                    const projectsArray = Array.isArray(response) ? response : [response];
                    setProjects(projectsArray);
                    console.log(projectsArray);
                })
                .catch(console.error);
        }
    }, [studentId]);

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Project Details</h1>
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <div key={index} className="mb-6 p-4 border rounded shadow-md">
                            <h2 className="text-xl font-semibold">Project {index + 1}</h2>
                            <p className="rounded"><strong>Title:</strong> {project.title}</p>
                            <p><strong>Summary:</strong> {project.summary}</p>
                            <p>
                                <strong>Technologies:</strong> 
                                {project.technology && project.technology.length > 0 
                                    ? project.technology.map(t => t.technologyName).join(', ') 
                                    : 'No technologies listed'}
                            </p>
                            <p>
                                <strong>Categories:</strong> 
                                {project.category && project.category.length > 0 
                                    ? project.category.map(c => c.categoryName).join(', ') 
                                    : 'No categories listed'}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>Loading.......</p>
                )}
            </div>
        </>
    );
}
