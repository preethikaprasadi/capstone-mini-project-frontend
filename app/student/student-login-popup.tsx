"use client";
import React, { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { loginStudent } from "@/service/student.service";
import { useRouter } from "next/navigation";
import router from "next/dist/client/router";
import NewStudAccCreatedPopup from "./stud-acc-successfully-created-popup";
 
 

export default function LoginStudentForm( ) {
  const { onClose } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [error, setError] = useState<string | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const validateEmail = (email: string) => {  
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length > 6;
  };

  const onSubmit = async () => {
  setError(null);
  if (!validateEmail(email)) {
    setError("Invalide email address!");
    return;
  }
  if (!email.trim() || !password.trim()) {
    setError("Please fill out all fields.");
    return;
  }

  if (!validatePassword(password)) {
    setError("Password must be more than 6 characters!");
    return;
  }
  try {
    const res = await loginStudent({
      email: email,
      password: password,
    });
    if (res) {
      clearForm();
      onClose();
      setIsSuccessOpen(true);
    }
  } catch (err: any) {
    if (err.message === "Invalid email or password") {
      setError("Invalid email or password. Please try again.");
    } else if (err.message === "Unauthorized") {
      setError("Unauthorized access. Please check your credentials.");
    } else {
      setError("Invalied Email or Password!");
    }
    console.error("Login failed:", err);
  }
};


  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  

  return (
    <>
      <div className={"w-full flex items-center justify-center flex-col gap-4"}>
        <Input
            className="max-w-xs"
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant={"bordered"}
        />

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

          {error && <p className="text-white rounded-lg p-1 mt-1 mt-1 bg-red-600 text-xs">{error}</p>}
        <Button color="primary" type="submit" onPress={onSubmit}>
          Submit
        </Button>
      </div>
      <NewStudAccCreatedPopup isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
    </>
    
  );
}
