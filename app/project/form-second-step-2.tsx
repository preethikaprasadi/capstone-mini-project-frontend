

"use client";
import React, {useContext, useEffect, useState} from 'react';
import { Button } from "@nextui-org/react";
import { MultiStepContext, useMultiStepContext } from "@/app/step-context";
import ParentTechnologySet from "./parentTechnologySet";

function FormSecondStep() {
    const { setStep, userData, setUserData, } = useMultiStepContext();
     const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

    const handleNext = () => {
        const newUserData = { ...userData, selectedTechnologies };
        console.log("newuser: ", { selectedTechnologies });
        console.log("userData before update", userData);

        setUserData(newUserData);
        setStep(prevStep => prevStep + 1);

        console.log("Current userData:", newUserData);

    };

    const handlePrev = () => {
        setStep((prevStep) => prevStep - 1);
    };
    // useEffect(() => {
    //     // Any side-effects based on the updated userData or step can be handled here
    // }, [userData, setStep]);
    return (
        <div className="flex justify-center items-center">
            <section className="w-6/12">
                <ParentTechnologySet
                    selectedTechnologies={selectedTechnologies}
                    setSelectedTechnologies={setSelectedTechnologies}
                />
                <div className="flex flex-col gap-4">
                    <Button radius="full" variant="shadow" color="primary" onClick={handlePrev}>
                        Prev
                    </Button>
                    <Button radius="full" variant="shadow" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default FormSecondStep;
