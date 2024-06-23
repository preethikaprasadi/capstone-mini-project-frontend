"use client";
import React, { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

import { saveStudent } from "@/service/student";

export default function LoginStudentForm({ onSave }) {
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

  return (
    <>
      {/*<div className={"flex items-center justify-center h-screen"}>*/}
      <div className={"w-full flex items-center justify-center flex-col gap-4"}>
        {/*<Input*/}
        {/*  isClearable*/}
        {/*  className="max-w-xs"*/}
        {/*  label="First Name"*/}
        {/*  placeholder="Enter your first name"*/}
        {/*  type="text"*/}
        {/*  value={firstName}*/}
        {/*  variant="bordered"*/}
        {/*  onChange={(e) => setFirstName(e.target.value)}*/}
        {/*  onClear={() => console.log("input cleared")}*/}
        {/*/>*/}
        {/*<Input*/}
        {/*  isClearable*/}
        {/*  className="max-w-xs"*/}
        {/*  label="Last Name"*/}
        {/*  placeholder="Enter your last name"*/}
        {/*  type="text"*/}
        {/*  value={lastName}*/}
        {/*  variant="bordered"*/}
        {/*  onChange={(e) => setLastName(e.target.value)}*/}
        {/*  onClear={() => console.log("input cleared")}*/}
        {/*/>*/}

        <Input
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

        <Input
          className="max-w-xs"
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant={"bordered"}
        />
        {/*<Button color="primary" type="submit" onPress={onSubmit}>*/}
        {/*  Submit*/}
        {/*</Button>*/}
      </div>
      {/*</div>*/}
    </>
  );
}
