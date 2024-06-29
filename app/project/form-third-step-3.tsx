"use client";
import React, { useContext, useState } from 'react';
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import {  useMultiStepContext } from "@/app/step-context";

function FormThirdStep() {
    const { setStep, userData, setUserData, finalData, setFinalData ,submitData} = useMultiStepContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePrev = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = () => {
        setFinalData([...finalData, { email, password }]);
        // handle actual form submission logic here
    };

    return (
        <div className="flex justify-center items-center">
            <section className="w-6/12">
                <div className="flex flex-col gap-2">
                    <Input
                        label="Email"
                        placeholder="Enter email"
                        type="email"
                        variant="flat"
                        className="w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Textarea
                        label="Password"
                        placeholder="Enter password"
                        type="password"
                        variant="flat"
                        className="w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Button radius="full" variant="shadow" color="primary" onClick={handlePrev}>
                        Prev
                    </Button>
                    <Button radius="full" variant="shadow" color="danger" onClick={submitData}>
                        Submit
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default FormThirdStep;
