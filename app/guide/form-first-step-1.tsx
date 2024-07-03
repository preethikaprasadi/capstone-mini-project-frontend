import React, {useState} from 'react';
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useMultiStepContext } from "@/app/step-context";

export default function GuideFormFirstStep() {

    const { guideCurrentStep,setGuideCurrentStep,guideUserData,setGuideUserData} = useMultiStepContext();

    const handleNext = () => {
     ;
        setGuideCurrentStep(prevStep => prevStep + 1);
        console.log("current step: ", guideCurrentStep);
         // console.log("user data: ", guideUserData);
    };

    return (
        <div className="flex items-center justify-center gap-4">
            <section className="w-6/12">
                <div className="flex flex-col gap-4">
                    <div>
                        <Input
                            label="Title"
                            placeholder="Enter title"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['titleValue']}
                            onChange={(e) => setGuideUserData({...guideUserData,"titleValue":e.target.value})}
                        />
                    </div>
                    <div>
                        <Textarea
                            label="Summary"
                            placeholder="Enter summary"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['summeryValue']}
                            onChange={(e) => setGuideUserData({...guideUserData,"summeryValue":e.target.value})}
                        />
                    </div>
                    <br />
                    <Button radius="full" variant="shadow" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                </div>
            </section>
        </div>
    );
}


