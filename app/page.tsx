"use client";
import React from "react";
import { title, subtitle } from "@/app/components/primitives";
import { Navbar } from "@/app/components/navbar";
import { Student } from "@/service/student.service";
import NewStudentSignupPopup from "@/app/student/new-student-signup-popup";
import GuideLoginPopup from "@/app/guide/login-popup";
import LoginStudentForm from "./student/student-login-popup";
 

export default function Home() {

  const handleSave = (student: Student) => {
    console.log("Trying to save: ", student);
  };
   
  return (
      <>
        
        <Navbar />
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title()}>Empower Your</h1>
            <br />
            <h1 className={title()}>Software Development Skills</h1>
            <br />
            <h1 className={title()}>with </h1>
            <h1 className={title({ color: "violet" })}>Guidly</h1>
            <br />
            <h2 className={subtitle({ class: "mt-6" })}>
              Connecting University Students and Guiders Together
            </h2>
          </div>


          <div className="flex gap-3">
            <NewStudentSignupPopup onSave={handleSave}/>
            <GuideLoginPopup onSave={undefined}/>
          </div>
        </section>
      </>
  );
}
