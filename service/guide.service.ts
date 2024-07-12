export interface Guide {
    
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePic: 'path/to/profilePic1.jpg'
    job: string;
    about: string;
    milestones: string;
    socialMediaLinks: string;
    technologies: { technologyName: string }[];

  }
  
  export async function getAllGuide(): Promise<Guide[]> {
    const url: string = "http://localhost:3000/guides";
    const response: Response = await fetch(url, { cache: "no-store" });
    const guides: Guide[] = await response.json();
  
    return guides;
  }
  
  export async function getOneGuide(id: string): Promise<Guide> {
    const url: string = "http://localhost:3000/guides/" + id;
    const response: Response = await fetch(url,{ cache: "no-store" });
    const guide: Guide = await response.json();
  
    return guide;
  }
  
  export async function saveGuide(guideRequest: Guide): Promise<Guide> {
    const url: string = "http://localhost:3000/guides";
    const request = new Request(url, {
      body: JSON.stringify(guideRequest),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      cache: "no-store",
    });
    const response: Response = await fetch(request);
    const guide: Guide = await response.json();
  
    return guide;
  }
  
  export async function updateGuide(guideRequest: Guide): Promise<Guide> {
    const url: string = "http://localhost:3000/guides/" + guideRequest.id;
    const dto = {
      firstName: guideRequest.firstName,
      lastName: guideRequest.lastName,
      email: guideRequest.email,
      password: guideRequest.password,
      profilePic: guideRequest.profilePic,
      job: guideRequest.job,
      about: guideRequest.about,
      milestones: guideRequest.milestones,
      socialMediaLinks: guideRequest.socialMediaLinks,
      
    };
    const request = new Request(url, {
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "PUT",
      cache: "no-store",
    });
    const response: Response = await fetch(request);
    const guide: Guide = await response.json();
  
    return guide;
  }
  
  export async function deleteGuide(id: string): Promise<Guide> {
    const url: string = "http://localhost:3000/guides/" + id;
    const request = new Request(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "DELETE",
      cache: "no-store",
    });
    const response: Response = await fetch(request);
    const guide: Guide = await response.json();
  
    return guide;
  }
  