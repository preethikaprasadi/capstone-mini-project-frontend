"use client";
import { button as buttonStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import React from "react";

import { title, subtitle } from "@/app/components/primitives";
import { Navbar } from "@/app/components/navbar";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import NewStudentForm from "@/app/new-student-form";
import { Student } from "@/service/student";
import { Link } from "@nextui-org/link";
import LoginStudentForm from "@/app/student-form-login";

export default function Home() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onOpenChange: onLoginOpenChange, onClose: onLoginClose } = useDisclosure();

  const handleSave = (student: Student) => {
    console.log("Trying to save: ", student);
  };

  const handleLoginClick = () => {
    onClose();  // Close the "Create New Account" modal
    onLoginOpen();  // Open the login modal
  };
  const handleSignUpClick =()=>{
    onLoginClose();
    onOpen();
  }

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
            <Button onPress={onOpen}>Student</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">Create New Account</ModalHeader>

                      <ModalBody>
                        <div className="flex flex-row items-center gap-2">
                          <p> Do you already have an account? </p>
                          <Link href="#" underline="always" onClick={handleLoginClick}>Login</Link>
                        </div>
                        <NewStudentForm onSave={handleSave}  />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                          Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                          Create Account
                        </Button>
                      </ModalFooter>
                    </>
                )}
              </ModalContent>
            </Modal>

            <Modal isOpen={isLoginOpen} onOpenChange={onLoginOpenChange}>
              <ModalContent>
                {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
                      <ModalBody>
                        <div className="flex flex-row items-center gap-2">
                          <p> Do you not have an account? </p>
                          <Link href="#" underline="always" onClick={handleSignUpClick}>Create New Account</Link>
                        </div>
                        <LoginStudentForm/>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                          Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                          Login
                        </Button>
                      </ModalFooter>
                    </>
                )}
              </ModalContent>
            </Modal>

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
