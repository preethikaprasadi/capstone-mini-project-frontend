"use client";
import React, { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { loginStudent } from "@/service/student.service";
import { useRouter } from "next/navigation";
import router from "next/dist/client/router";
 
 

export default function LoginStudentForm( ) {
  const { onClose } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
   
  try {
    const res = await loginStudent({
      email: email,
      password: password,
    });
    console.log("Login response:", res);
    if (res) {
      clearForm();
      onClose();
      // Navigate to the desired page after successful login
      router.push("/");
    }
  } catch (err) {
    setError("Login failed. Please check your credentials and try again.");
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


        <Button color="primary" type="submit" onPress={onSubmit}>
          Submit
        </Button>
      </div>

    </>
  );
}
