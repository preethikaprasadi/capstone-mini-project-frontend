"use client";
import React, { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { Input } from "@nextui-org/input";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import { saveStudent } from "@/service/student";
import {Link} from "@nextui-org/link";
import LoginStudentForm from "@/app/student-form-login";

export default function NewStudentFormPopup({ onSave }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onOpenChange: onLoginOpenChange, onClose: onLoginClose } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const variants = ["bordered"];
  const sizes = ["sm", "md", "lg"];
  const onSubmit = async () => {
    const res = await saveStudent({
      id: "",
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });


    onSave(res);
    clearForm();
    onClose();
    console.log("trying to save",res);
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
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



      <div className="flex gap-3">
        <Button onPress={onOpen}>Student</Button>

        <Modal className={"p-0 m-0 max-w-3xl h-max"}  isOpen={isOpen} onOpenChange={onOpenChange}>

          <ModalContent  className={" fixed-size pt-0"} >

            {(onClose) => (
                <>

                  {/*<ModalHeader className="flex flex-col gap-1">Create New Account</ModalHeader>*/}
                  <div className={" flex flex-col"}>
                    <div>
                  <ModalBody className={"h-full p-0 m-0 "} >
                    <div className={"flex flex-row gap-3 "}>
                    <div className={"basis-2/5 border-r-1 pr-10 pt-10 pl-8 bg-zinc-800"}>
                      <p> Your Projects Success Starts from here</p>
                    </div>
                      <div className={"basis-3/5 "}>
                    <div className="w-full flex flex-row  gap-2 justify-center pt-10 pb-5  ">
                      <p> Do you already have an account? </p>
                      <Link href="#" underline="always" onClick={handleLoginClick}>Login</Link>
                    </div>
                                      <div className={"w-full flex items-center justify-center flex-col gap-4"}>
                                        <Input
                                            isRequired
                                          isClearable
                                          className="max-w-xs"
                                          label="First Name"
                                          placeholder="Enter your first name"
                                          type="text"
                                          value={firstName}
                                          variant="bordered"
                                          onChange={(e) => setFirstName(e.target.value)}
                                          onClear={() => console.log("input cleared")}
                                        />
                                        <Input
                                            isRequired
                                          isClearable
                                          className="max-w-xs"
                                          label="Last Name"
                                          placeholder="Enter your last name"
                                          type="text"
                                          value={lastName}
                                          variant="bordered"
                                          onChange={(e) => setLastName(e.target.value)}
                                          onClear={() => console.log("input cleared")}
                                        />

                                        <Input
                                            isRequired
                                            className="max-w-xs"
                                            label="Email"
                                            placeholder="Enter your email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            variant={"bordered"}
                                        />

                                        <Input
                                            isRequired
                                          className="max-w-xs"
                                          endContent={
                                            <button
                                              className="focus:outline-none"
                                              type="button"
                                              onClick={toggleVisibility}
                                            >
                                              {isVisible ? (
                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                              ) : (
                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                              )}
                                            </button>
                                          }
                                          label="Password"
                                          placeholder="Enter your password"
                                          type={isVisible ? "text" : "password"}
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          variant="bordered"
                                        />



                                        {/*<Button color="primary" type="submit" onPress={onSubmit}>*/}
                                        {/*  Submit*/}
                                        {/*</Button>*/}


                                      </div>
                        <div className={"flex flex-row justify-end p-10 pb-5"}>
                          <div >
                            <Button color="danger" variant="light" onPress={onClose}>
                              Close
                            </Button>
                          </div>
                          <div>
                            <Button color="primary" onPress={onSubmit}>
                              Create Account
                            </Button>
                          </div>
                        </div>
                    </div>
                    </div>
                  </ModalBody>
                    </div>

                  </div>
                </>
            )}
          </ModalContent>
        </Modal>

        <Modal className={"p-0 m-0 max-w-3xl "} isOpen={isLoginOpen} onOpenChange={onLoginOpenChange}>
          <ModalContent className={"pt-0"}>
            {(onClose) => (
                <>
                  <div className={"flex flex-col"}>
                    <div>
                      <ModalBody className={"h-full p-0 m-0"}>
                        <div className={"flex flex-row gap-3"}>
                          <div className={"basis-2/5 border-r-1 pr-10 pt-10 pl-8 bg-zinc-800"}>
                            <p>Your Projects Success Starts from here</p>
                          </div>
                          <div className={"basis-3/5"}>
                            <div className="w-full flex flex-row gap-2 justify-center pt-10 pb-20">
                              <p>Do you not have an account?</p>
                              <Link href="#" underline="always" onClick={handleSignUpClick}>Create New Account</Link>
                            </div>
                            <div className={"w-full flex items-center justify-center flex-col gap-4 pb-20"}>
                              <LoginStudentForm />
                            </div>
                            <div className={"flex flex-row justify-end p-10 pb-5"}>
                              <div>
                                <Button color="danger" variant="light" onPress={onClose}>
                                  Close
                                </Button>
                              </div>
                              <div>
                                <Button color="primary" onPress={onClose}>
                                  Login
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ModalBody>
                    </div>
                  </div>
                </>
            )}
          </ModalContent>
        </Modal>


      </div>
    </>
  );
}
