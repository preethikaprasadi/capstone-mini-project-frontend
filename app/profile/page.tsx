"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getOneGuide, updateGuide, Guide } from '../../service/guide.service'; // Adjust the import path as needed
import { getAllTechnology, Technology } from '@/service/technology.service';
import { Category, getAllCategory } from '@/service/category.service';
import { Chip } from '@nextui-org/react';
 

export default function Page() {
  const { data: session } = useSession();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [formData, setFormData] = useState<Partial<Guide>>({});
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const id = session?.user.id;

  useEffect(() => {
    if (id) {
      getOneGuide(id).then(guide => {
        setGuide(guide);
        setFormData({
          firstName: guide.firstName,
          lastName: guide.lastName,
          job: guide.job,
          about: guide.about,
          milestones: guide.milestones,
          socialMediaLinks:guide.socialMediaLinks,
          technologies: guide.technologies?.map(tech => tech.id) || [],  
          categories: guide.categories?.map(cat => cat.id) || [],
          
        });
      }).catch(console.error);

      getAllTechnology().then(techs => {
        setTechnologies(techs);
      }).catch(console.error);

      getAllCategory().then(cats => {
        setCategories(cats);
      }).catch(console.error);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechnologyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techId = e.target.value;
    const isChecked = e.target.checked;

    setFormData(prev => {
      let updatedTechnologies = prev.technologies || [];
  
      if (isChecked) {
        updatedTechnologies = [...updatedTechnologies, techId];
      } else {
        updatedTechnologies = updatedTechnologies.filter(t => t !== techId);
      }
  
      return { ...prev, technologies: updatedTechnologies };
    });
  
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const catId = e.target.value;
    const isChecked = e.target.checked;

    setFormData(prev => {
      let updatedCategories = prev.categories || [];
  
      if (isChecked) {
        updatedCategories = [...updatedCategories, catId];
      } else {
        updatedCategories = updatedCategories.filter(c => c !== catId);
      }
  
      return { ...prev, categories: updatedCategories };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && id) {
      const updatedGuide = { ...guide, ...formData, id } as Guide;
      try {
        const response = await updateGuide(updatedGuide);
        setGuide(response);
        setIsEditing(false);
        alert('Guide updated successfully');
      } catch (error) {
        console.error(error);
        alert('Failed to update guide');
      }
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  if (!guide) {
    return <div>No guide found</div>;
  }

  const programmingLanguages = technologies.filter(tech => Number(tech.technologyType) === 0);
  const frameworks = technologies.filter(tech => Number(tech.technologyType) === 1);
  const databases = technologies.filter(tech =>Number(tech.technologyType) === 3);
 
  return (
    <div className="container mx-auto p-4  "style={{ borderRadius: '1.5rem' }}>
      
 
 {/* 'images/22.jpg' */}
      {!isEditing ? (
        
  <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg bg-gradient-to-br from-gray-800 via-black to-gray-900 backdrop-blur-lg bg-opacity-50">
    <div className="absolute top-0 left-0 w-full h-1/3 bg-cover bg-center bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 " style={{ borderRadius: '1.5rem' }}><hr className="my-64 border-t-5 border-gray-400"/></div>
  <div className="flex flex-col md:flex-row items-start md:space-x-8">
    {/* Profile Section */}
    <div className="flex flex-col items-center m-12 relative">
      {/* White background */}
      
      
      <div className="relative w-60 h-60 flex items-center justify-center mb-6">
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400"></div>
        <div className="absolute w-64 h-64 rounded-full border-4 border-white"></div>
        <div className="relative w-60 h-60 rounded-full overflow-hidden shadow-md">
          <img
            src={guide.profilePic || 'images/22.jpg'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{guide.firstName} {guide.lastName}</h1>
        <p className="text-lg mb-2">{guide.job}</p>
        <p className="text-sm mb-4">{guide.email}</p>
      </div>
      <div className="flex items-center mt-12">
    <button
      onClick={() => setIsEditing(true)}
      className="flex items-center px-2  text-gray-400 rounded-md shadow-sm hover:bg-gray-200"
    >
      <svg
        className="w-5 h-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M14.293 3.293a1 1 0 0 1 1.414 1.414l-10 10a1 1 0 0 1-.32.208l-3 1a1 1 0 0 1-1.269-1.27l1-3a1 1 0 0 1 .208-.32l10-10z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M15 5a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1z"
          clipRule="evenodd"
        />
      </svg>
      Edit Profile
    </button>
  </div>
    </div>

    {/* Skills and Excellence In Section */}
    <div className="w-full flex flex-col md:flex-row md:space-x-12 mt-6  " style={{ marginTop: '350px' }}>
      <div className="md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap">
          {guide.technologies?.map((tech, index) => (
            <Chip
              key={index}
              className="bg-gradient-to-r from-pink-500 via-pink-800 to-pink-900 text-white text-sm font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded-full border border-transparent hover:border-gray-400"
            >
              {tech.technologyName}
            </Chip>
          ))}
        </div>
      </div>
      <div className="md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Excellence In</h2>
        <div className="flex flex-wrap">
          {guide.categories?.map((cat, index) => (
            <Chip
              key={index}
              className="bg-gradient-to-r from-yellow-500 via-yellow-800 to-yellow-900 text-white text-sm font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded-full border border-transparent hover:border-gray-400"
            >
              {cat.categoryName}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  </div>

  

  <hr className="my-20 border-t-2 border-gray-700" />

  {/* Additional Info Section */}
  <div className="space-y-4 text-gray-300">
    <div>
      <h2 className="text-xl font-semibold">About</h2>
      <p className="text-lg">{guide.about}</p>
    </div>
    <div>
      <h2 className="text-xl font-semibold">Milestones</h2>
      <p className="text-lg">{guide.milestones}</p>
    </div>
    <div>
      <h2 className="text-xl font-semibold">Social Media Links</h2>
      <p className="text-lg">{guide.socialMediaLinks}</p>
    </div>
  </div>

  
</div>

 
 
    
    
     
     
      
      
      
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job:</label>
            <input
              type="text"
              name="job"
              value={formData.job || ''}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">About:</label>
            <textarea
              name="about"
              value={formData.about || ''}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Milestones:</label>
            <textarea
              name="milestones"
              value={formData.milestones || ''}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Socia Media Links:</label>
            <textarea
              name="socialMediaLinks"
              value={formData.socialMediaLinks || ''}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Technologies:</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold">Programming Languages</h3>
                {programmingLanguages.map(tech => (
                  <div key={tech.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={tech.id}
                      value={tech.id}
                      checked={formData.technologies?.includes(tech.id)}
                      onChange={handleTechnologyChange}
                      className="mr-2"
                    />
                    <label htmlFor={tech.id}>{tech.technologyName}</label>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-semibold">Frameworks</h3>
                {frameworks.map(tech => (
                  <div key={tech.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={tech.id}
                      value={tech.id}
                      checked={formData.technologies?.includes(tech.id)}
                      onChange={handleTechnologyChange}
                      className="mr-2"
                    />
                    <label htmlFor={tech.id}>{tech.technologyName}</label>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-semibold">Databases</h3>
                {databases.map(tech => (
                  <div key={tech.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={tech.id}
                      value={tech.id}
                      checked={formData.technologies?.includes(tech.id)}
                      onChange={handleTechnologyChange}
                      className="mr-2"
                    />
                    <label htmlFor={tech.id}>{tech.technologyName}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Categories:</label>
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={cat.id}
                  value={cat.id}
                  checked={formData.categories?.includes(cat.id)}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                <label htmlFor={cat.id}>{cat.categoryName}</label>
              </div>
            ))}
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">
            Update Guide
          </button>
          <button onClick={() => setIsEditing(false)} type="button" className="mt-4 ml-4 px-4 py-2 bg-gray-600 text-white rounded-md shadow-sm hover:bg-gray-700">
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
