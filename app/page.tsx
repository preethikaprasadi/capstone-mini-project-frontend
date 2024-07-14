"use client";
import React from "react";
import { title} from "@/app/components/primitives";
import { Navbar } from "@/app/components/navbar";
import { Student } from "@/service/student.service";
import NewStudentSignupPopup from "@/app/student/new-student-signup-popup";
import GuideLoginPopup from "@/app/guide/login-popup";
import TypeWrite from "./Typewriteeffect";
 

export default function Home() {

  const handleSave = (student: Student) => {
    console.log("Trying to save: ", student);
  };
   
  return (
      <>

        <Navbar />
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" 
        style={{ 
          minHeight: '600px',
          }}>
           
            <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" https://img.freepik.com/free-vector/gradient-black-background-with-wavy-lines_23-2149151738.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706313600&semt=ais")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
        }}
      ></div>
             
             <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
            <h1 className={title()}>Empower Your</h1>
            <br />
            <h1 className={title()}>Software Development Skills</h1>
            <br />
            <h1 className={title()}>
          with <span className={title({ color: "violet" })}>Guidly</span>
            </h1>
            <br />
           
            <TypeWrite/>
          </div>
          
          
          <div className="flex gap-3">
            <NewStudentSignupPopup onSave={handleSave}/>
            <GuideLoginPopup onSave={undefined}/>
          </div>

        </section>
         
        <div className="container mx-auto mx-auto flex flex-col justify-end min-h-screen mt-18">
               <div className="text-3xl font-bold my-8 text-left m-10">
              <h1 className={title({size:"xm"})}>Explore <span className={title({ color: "yellow",size:"sm" })}>1,000 +</span> available mentors</h1>
              </div>
              {/* <GuideList /> */}
        </div>
       <div className="text-3xl font-bold my-8  text-center ">  
       <div className='text-4xl font-bold text-center mb-10'>

          
         <h1>
         <img src="/images/19.png" alt="Icon" className="inline-block mr-4 h-14 w-14" />  
           Technologies Our<span className={title({ color: "yellow", size: "sm" })}> Mentors</span> Excel In
         </h1>

       </div> 
       <div className=' p-6 rounded-lg shadow-lg ' >
       <div className='text-lg text- leading-relaxed '>

        <h2 className='text-xl text-center '>
          "Our mentors are experts in a wide array of programming languages and frameworks,
           ensuring you get the best guidance<br/>  for your projects. Explore the technologies our 
           mentors specialize in and find the perfect match to elevate your<br/>  coding skills and 
           project outcomes. Select a mentor who excels in your chosen technology and start 
           building with confidence."
        </h2>

     </div>
     </div>
     </div>
     <div className="mb-40">
        <StandardImageList/>
     </div> 
       <Footer/>
     </section>  
      </>
  );
}
