 
// import * as React from 'react';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';

// export default function StandardImageList() {
//   return (
//     <div className='bg-gradient-to-r from-gray-800 via-gray-900 to-black p-10'>
//       <div className='text-center m-10'>
//         <h1 className='text-4xl font-bold text-white'>Technologies Our Mentors Excel In</h1>
//         <h5 className='text-lg text-gray-300 mt-4'>
//           "Our mentors are experts in a wide array of programming languages and frameworks, ensuring you get the best guidance for your projects. Explore the technologies our mentors specialize in and find the perfect match to elevate your coding skills and project outcomes. Select a mentor who excels in your chosen technology and start building with confidence."
//         </h5>
//       </div>
//       <ImageList 
//         sx={{ 
//           width: 400, 
//           height: 'auto', 
//           overflow: 'hidden',
//           backgroundColor: '#1c1c1e',
//           padding: '20px',
//           borderRadius: '10px',
//           boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.6)',
//           margin: '0 auto'
//         }} 
//         cols={4} 
//         rowHeight={80}
//       >
//         {itemData.map((item) => (
//           <ImageListItem 
//             key={item.img} 
//             sx={{
//               position: 'relative',
//               border: '2px solid #333',
//               borderRadius: '5px',
//               overflow: 'hidden',
//               boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.7)',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//                 transition: 'transform 0.3s ease-in-out',
//               },
//               '& img': {
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//                 borderRadius: '5px',
//                 filter: 'brightness(0.7)',
//               },
//               '&::after': {
//                 content: `"${item.title}"`,
//                 position: 'absolute',
//                 bottom: '0',
//                 left: '0',
//                 width: '100%',
//                 background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2))',
//                 color: 'white',
//                 textAlign: 'center',
//                 padding: '5px 0',
//                 fontSize: '14px',
//               },
//             }}
//           >
//             <img
//               src={item.img}
//               alt={item.title}
//               loading="lazy"
//             />
//           </ImageListItem>
//         ))}
//       </ImageList>
//     </div>
//   );
// }

// const itemData = [
//   {
//     img: '/images/1.png',
//     title: 'Breakfast',
//   },
//   {
//     img: 'https://www.desuvit.com/wp-content/uploads/2021/03/mongodb-icon.png',
//     title: 'Burger',
//   },
//   {
//     img: 'https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png',
//     title: 'Camera',
//   },
//   {
//     img: '/images/2.png',
//     title: 'Coffee',
//   },
//   {
//     img: 'https://miro.medium.com/v2/resize:fit:1400/1*cGDDA2mfYkjiIhGaN8gDoA.png',
//     title: 'Hats',
//   },
//   {
//     img: 'https://opensource.fb.com/img/projects/react.jpg',
//     title: 'Honey',
//   },
//   {
//     img: 'https://static.vecteezy.com/system/resources/previews/009/023/809/non_2x/php-logo-php-letter-php-letter-logo-design-initials-php-logo-linked-with-circle-and-uppercase-monogram-logo-php-typography-for-technology-business-and-real-estate-brand-vector.jpg',
//     title: 'Basketball',
//   },
//   {
//     img: 'https://media.dev.to/cdn-cgi/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fdxy1c2bvl6odeo52dodk.jpg',
//     title: 'Fern',
//   },
//   {
//     img: '/images/3.png',
//     title: 'Mushrooms',
//   },
//   {
//     img: '/images/4.png',
//     title: 'Tomato basil',
//   },
//   {
//     img: '/images/5.png',
//     title: 'Sea star',
//   },
//   {
//     img: '/images/6.png',
//     title: 'Bike',
//   },
//   {
//     img: '/images/7.png',
//     title: 'Mushrooms',
//   },
//   {
//     img: '/images/8.png',
//     title: 'Tomato basil',
//   },
//   {
//     img: 'https://m.media-amazon.com/images/I/410Z2CHLy2L._AC_UF1000,1000_QL80_.jpg',
//     title: 'Sea star',
//   },
//   {
//     img: '/images/9.png',
//     title: 'Bike',
//   },
// ];

