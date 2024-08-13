
export interface ProjectRequest {
    guideId: string;
    projectId: string;
    status: string;
}

export async function createRequest(projectRequest: ProjectRequest): Promise<ProjectRequest> {
    const url: string = "http://localhost:3000/projectRequests";
    const request = new Request(url, {
        body: JSON.stringify(projectRequest),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "POST",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const projectRequest1: ProjectRequest = await response.json();

    return projectRequest1;
}

