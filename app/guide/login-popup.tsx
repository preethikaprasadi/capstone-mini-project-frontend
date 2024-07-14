"use client";
import React, { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { Input } from "@nextui-org/input";
import {Modal, ModalBody, ModalContent, useDisclosure} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import { saveStudent } from "@/service/student";
import {useRouter} from "next/navigation";
import {Link} from "@nextui-org/react";

export default function GuideLoginPopup({ onSave }) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isVisible, setIsVisible] = React.useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);
    const variants = ["bordered"];
    const sizes = ["sm", "md", "lg"];
    const onSubmit = async () => {
        //   // const res = await saveStudent({
        //   //   email: email,
        //   //   password: password,
        //   // });
        //
        //   onSave(res);
        //   clearForm();
        //   onClose();
        //
        //   console.log("trying to save",res);
        //
    };

    // const clearForm = () => {
    //   setFirstName("");
    //   setLastName("");
    //   setEmail("");
    //   setPassword("");
    // };

    return (
        <>
            
            <Button
                 className="px-6 py-3 text-lg font-semibold rounded-full bg-gradient-to-br from-black via-violet-900 to-blue-400 hover:bg-gradient-to-br hover:from-black hover:via-violet-900 hover:to-blue-400 relative overflow-hidden"
                 onPress={onOpen}
                   >
                <span className="relative z-10">Guide</span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white opacity-20 mix-blend-screen pointer-events-none"></span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white opacity-20 mix-blend-screen pointer-events-none"></span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white opacity-20 mix-blend-screen pointer-events-none"></span>
            </Button>
            <Modal className={"p-0 m-0 max-w-3xl h-max"} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className={"fixed-size pt-0"}>
                    {(onClose) => (
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
                                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                                    <p>Don't you have an account?</p>

                                                    <Link href="guide/create-new-guide-form" underline="always" >Create Account</Link>
                                                </div>

                                                <div className={"w-full flex items-center justify-center flex-col gap-4"}>

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
                                                <div className={"flex flex-row justify-end p-10 pb-5"}>
                                                    <div>
                                                        <Button color="danger" variant="light" onPress={onClose}>
                                                            Close
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        <Button color="primary" type="submit" onPress={onSubmit}>
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

        </>
    );
}
