 "use client"
import React, { useEffect, useState } from 'react';
import { Guide, getAllGuide } from '../../service/guide.service';

const GuideList: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const guideData = await getAllGuide();
        setGuides(guideData);
      } catch (error) {
        console.error('Failed to fetch guides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const placeholderImage = '/images/22.jpg';

  
  const limitedGuides = Array.isArray(guides) ? guides.slice(0, 12) : [];
  console.log('Limited guides:', limitedGuides);
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 bg-gradient-to-br from-pink-700 via-black to-violet-800 w-4/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {limitedGuides.map((guide) => (
            <div
              key={guide.id}
              className="35374B text-white rounded-lg shadow-lg hover:shadow-white transition-shadow duration-300 overflow-hidden h-100"
            >
              <div className="relative w-full h-2/3">
                <img
                  src={placeholderImage}
                  alt={`${guide.firstName} ${guide.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center p-4">
                <h2 className="text-xl font-bold text-gray-200">{`${guide.firstName} ${guide.lastName}`}</h2>
                <p className="text-sm mb-2 text-gray-400">{guide.job}</p>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {guide.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 border-2 border-gray-300 rounded-full text-xs font-semibold text-gray-400 bg-black-600"
                    >
                      {tech.technologyName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideList;




 
