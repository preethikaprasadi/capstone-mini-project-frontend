"use client";
import React, {useContext, useEffect, useState} from 'react';
import { Button } from "@nextui-org/react";
import { MultiStepContext, useMultiStepContext } from "@/app/step-context";
import ParentTechnologySet from "@/app/project/parentTechnologySet";


export default function GuideFormSecondStep() {
    const { setGuideCurrentStep, guideUserData, setGuideUserData, } = useMultiStepContext();
     const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

    const handleNext = () => {
        const newUserData = { ...guideUserData, selectedTechnologies };
        console.log("newuser: ", { selectedTechnologies });
        console.log("userData before update", guideUserData);

        setGuideUserData(newUserData);
        setGuideCurrentStep(prevStep => prevStep + 1);

        console.log("Current userData:", newUserData);

    };

    const handlePrev = () => {
        setGuideCurrentStep((prevStep) => prevStep - 1);
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


