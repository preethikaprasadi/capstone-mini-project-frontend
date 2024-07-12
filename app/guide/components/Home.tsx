import React from 'react';

import person from '@/app/guide/images/person.jpg'; // Adjust path as necessary

const Home = () => {
  return (
    <div className='pt-[24vh] md:pt-[12vh] h-85vh md:h-[60vh] custom-bg'>
      <div className='flex justify-center flex-col w-full h-full mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center'>
          <div>
            <h1 className='text-[#c4cfde] mb-[1.3rem]'>WELCOME TO MY ACCOUNT</h1>
            <div className='hidden md:block'>
            <img src="./images/person.jpg" alt="Sample Image" className="w-full rounded-lg shadow-md" />
          </div>
            <div>
              <h1 className='xl:text-[20px] lg:text-[15px] sm:text-[15px] text-[15px] font-semibold leading-[3.6rem] text-primary'>
                pethum Sandaruwan 
              </h1>
              
            </div>
            <p className='mt-[1.2rem] text-[15px] md:text-[17px] text-[#c4cfde]'>
              About- I am passionate about guiding projects to success with my expertise in information technology. With over 20 years of experience, I specialize in web development and programming. My goal is to provide personalized guidance and support to help clients achieve their project goals efficiently and effectively.
            </p>
            <div className='mt-[2rem] flex items-center space-x-6'>
              <button className='rounded-full relative flex h-[50px] w-40 items-center justify-center font-semibold overflow-hidden bg-primary text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-gray-500 before:duration-500 before:ease-out hover:before:h-56 hover:before:w-56'>
                <span className='relative z-10'>Contact me</span>
              </button>
            </div>
          </div>
         <div >
          <h2 className='xl:text-[30px] lg:text-[40px] sm:text-[35px] text-[25px] font-semibold leading-[3.6rem] text-white'>Skills</h2>
         <button className='rounded-3xl relative flex h-[35px] w-word.length items-center justify-center font-semibold overflow-hidden bg-gray-500 text-white shadow-xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-gray-500 before:duration-500 before:ease-out hover:before:h-56 hover:before:w-56'>
         <span className='relative z-10'>Contact me</span>
         </button>
         </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
