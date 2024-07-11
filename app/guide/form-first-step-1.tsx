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
          console.log("user data: ", guideUserData);
    };

    return (
        <div className="flex items-center justify-center gap-4">
            <section className="w-6/12">
                <div className="flex flex-col gap-4">
                    <div>
                        <Input
                            label="First Name"
                            placeholder="Enter first name"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['firstNameValue']}
                            onChange={(e) => setGuideUserData({...guideUserData,"firstNameValue":e.target.value})}
                        />
                    </div>
                    <div>
                    <Input
                            label="Last Name"
                            placeholder="Enter last name"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['lastNameValue']}
                            onChange={(e) => setGuideUserData({...guideUserData,"lastNameValue":e.target.value})}
                        />
                    </div>
                    <div>
                    <Input
                            label="Email"
                            placeholder="Enter email"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['emailValue']}
                            onChange={(e) => setGuideUserData({...guideUserData,"emailValue":e.target.value})}
                        />
                    </div>
                    <div>
                    <Input
                            label="Password"
                            placeholder="Enter Password"
                            type="text"
                            variant="flat"
                            className="w-full"
                            value={guideUserData['passwordPicValue']}
                            onChange={(e) => setGuideUserData({...guideUserData,"passwordValue":e.target.value})}
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


