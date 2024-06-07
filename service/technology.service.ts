export interface Technology {
    id: string;
   technologyType:string;
   technologyName:string;
}

export async function getAllTechnology(): Promise<Technology[]> {
    const url: string = "http://localhost:3000/technology";
    const response: Response = await fetch(url, { cache: "no-store" });
    const technologies: Technology[] = await response.json();

    return technologies;
}

// export async function getOneTechnology(id: string): Promise<Technology> {
//     const url: string = "http://localhost:3000/technology/" + id;
//     const response: Response = await fetch(url,{ cache: "no-store" });
//     const project: Project = await response.json();
//
//     return project;
// }

export async function saveTechnology(technologyRequest: Technology): Promise<Technology> {
    const url: string = "http://localhost:3000/technology";
    const request = new Request(url, {
        body: JSON.stringify(technologyRequest),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "POST",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const technology: Technology = await response.json();

    return technology;
}

// export async function updateProject(projectRequest: Project): Promise<Project> {
//     const url: string = "http://localhost:3000/projects/" + projectRequest.id;
//     const dto = {
//         title: projectRequest.title,
//         summary: projectRequest.summary,
//         student: projectRequest.student["id"],
//         technology: projectRequest["technologies"].map((tec) => tec["id"]),
//     };
//     const request = new Request(url, {
//         body: JSON.stringify(dto),
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//         },
//         method: "PUT",
//         cache: "no-store",
//     });
//     const response: Response = await fetch(request);
//     const project: Project = await response.json();
//
//     return project;
// }

// export async function deleteProject(id: string): Promise<Project> {
//     const url: string = "http://localhost:3000/projects/" + id;
//     const request = new Request(url, {
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//         },
//         method: "DELETE",
//         cache: "no-store",
//     });
//     const response: Response = await fetch(request);
//     const project: Project = await response.json();
//
//     return project;
// }
