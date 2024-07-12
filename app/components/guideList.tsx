//  "use client"
// import React, { useEffect, useState } from 'react';
// import { Guide, getAllGuide } from '../../service/guide.service';

// const GuideList: React.FC = () => {
//   const [guides, setGuides] = useState<Guide[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchGuides = async () => {
//       try {
//         const guideData = await getAllGuide();
//         setGuides(guideData);
//       } catch (error) {
//         console.error('Failed to fetch guides:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGuides();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

  

//   const placeholderImage = 'https://c8.alamy.com/comp/2K23Y2N/male-avatar-profile-picture-icon-in-circle-2K23Y2N.jpg';

//   return (
//     <div className="bg-black min-h-screen">
//       <div className="container mx-auto p-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {guides.map((guide) => (
//             <div
//               key={guide.id}
//               className="bg-gray-900 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//             >
//               <div className="flex flex-col items-center mb-4">
//                 <div className="relative">
//                   <img
//                     src={guide.profilePic || 'path/to/default/image.jpg'}
//                     alt={`${guide.firstName} ${guide.lastName}`}
//                     className="w-32 h-32 md:w-48 md:h-48 rounded-full mb-4 object-cover border-4 border-gray-800"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-75 rounded-full"></div>
//                 </div>
//                 <div className="text-center">
//                   <h2 className="text-xl font-bold">{`${guide.firstName} ${guide.lastName}`}</h2>
//                   <p className="text-sm mb-2 text-gray-400">{guide.job}</p>
//                 </div>
//                 <div className="flex flex-wrap gap-2 justify-center mt-4">
//                   {guide.technologies.map((tech, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 border border-gray-800 rounded-full text-sm font-semibold text-gray-200 bg-gray-800"
//                     >
//                       {tech.technologyName}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };



// export default GuideList;
