"use client";
import React, { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
import { Link, Button } from "@nextui-org/react";
import { saveStudent } from "@/service/student.service";
import LoginStudentForm from "@/app/student/student-login-popup";
import { useRouter } from "next/navigation";
import NewStudAccCreatedPopup from "@/app/student/stud-acc-successfully-created-popup";
import {BsCheckLg} from "react-icons/bs";

export default function NewStudentSignupPopup({ onSave }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onOpenChange: onLoginOpenChange, onClose: onLoginClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {  
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length > 6;
  };

  const onSubmit = async () => {
    if (!validateEmail(email)) {
      setError("Invalide email address!");
      return;
    }
  
    if (!validatePassword(password)) {
      setError("Password must be more than 6 characters!");
      return;
    }
    const res = await saveStudent({
      id: "",
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      success: undefined
    });

    

    onSave(res);
    handleLoginClick();
    clearForm();
    onClose();
    console.log("trying to save", res);
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const handleLoginClick = () => {
    onClose();
    onLoginOpen();
  };

  const handleSignUpClick = () => {
    onLoginClose();
    onOpen();
  };

  return (
      <>
 <div className="flex gap-3">


<Button radius="full" onPress={onOpen}>Student</Button>
          
          
<Modal className={"p-0 m-0 max-w-3xl h-max"} isOpen={isOpen} onOpenChange={onOpenChange}>
<ModalContent className={"fixed-size pt-0"}>{(onClose) => (
                  <>
                    <div className={"flex flex-col"}>
                          
                          <div>
                        <ModalBody className={"h-full p-0 m-0"}>
                          <div className={"flex flex-row gap-3"}>
                          <div className="container basis-2/5 border-r-1 pr-10 pt-10 pl-8 bg-zinc-800">

                                <p>Your Projects Success Starts from here</p>

                                <ul className="check-list">
                                  <li>Choose your guide according to your personal needs...</li>
                                  <li>available over 1000 guides..</li>
                                </ul>

                          </div>

                          <div className={"basis-3/5"}>
                          <div className="w-full flex flex-row gap-2 justify-center pt-10 pb-5">
                                <p>Do you already have an account?</p>

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
                              </div>

                              {error && <p className="flex text-white rounded-lg p-1 mt-1 mt-1 bg-red-600 text-xs max-w-xs relative left-14">{error}</p>}
                              <div className={"flex flex-row justify-end p-10 pb-5"}>
                                <div>
                                  <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                  </Button>
                                </div>
                                <div>
                                  <Button color="primary" type="submit" onPress={onSubmit}>
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

<Modal className={"p-0 m-0 max-w-3xl"} isOpen={isLoginOpen} onOpenChange={onLoginOpenChange}>
<ModalContent className={"pt-0"}>{(onClose) => (
                  <>
                    <div className={"flex flex-col"}>
                    <div>
                        <ModalBody className={"h-full p-0 m-0"}>

                          <div className={"flex flex-row gap-3"}>
                          <div className="container basis-2/5 border-r-1 pr-10 pt-10 pl-8 bg-zinc-800">


                              <p>Your Projects Success Starts from here</p>
                              <ul className="check-list">
                                <li>Choose your guide according to your personal needs...</li>
                                <li>available over 1000 guides..</li>
                              </ul>

                          </div>

                          <div className={"basis-3/5"}>
                          <div className="w-full flex flex-row gap-2 justify-center pt-10 pb-20">


                                <p>Do you not have an account?</p>

                                <Link href="#" underline="always" onClick={handleSignUpClick}>Create New Account</Link>
                              </div>
                              <div className={"w-full flex items-center justify-center flex-col gap-4 pb-20"}>
                                <LoginStudentForm />
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