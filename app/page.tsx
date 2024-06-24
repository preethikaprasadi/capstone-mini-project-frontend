"use client";
import { button as buttonStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import React from "react";

import { title, subtitle } from "@/app/components/primitives";
import { Navbar } from "@/app/components/navbar";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import NewStudentForm from "@/app/new-student-form-popup";
import { Student } from "@/service/student";
import { Link } from "@nextui-org/link";
import LoginStudentForm from "@/app/student-form-login";
import NewStudentFormPopup from "@/app/new-student-form-popup";

export default function Home() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onOpenChange: onLoginOpenChange, onClose: onLoginClose } = useDisclosure();

  const handleSave = (student: Student) => {
    console.log("Trying to save: ", student);
  };


  return (
      <>
        {/*<ThemeSwitch/>*/}
        {/*<DiscordIcon/>*/}
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
            <NewStudentFormPopup onSave={handleSave}/>
            <NextLink
                className={buttonStyles({ variant: "bordered", radius: "full" })}
                href="/guide"
            >
              Guide
            </NextLink>
          </div>
        </section>
      </>
  );
}
