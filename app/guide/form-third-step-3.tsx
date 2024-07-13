"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import { useMultiStepContext } from "@/app/step-context";
import ParentTechnologySet from "@/app/project/parentTechnologySet";
import SelectCategory from "@/app/category/select-category";
import { Category, getAllCategory } from "@/service/category.service";

export default function GuideFormThirdStep() {
    const { setGuideCurrentStep, guideUserData, setGuideUserData, guideFinalData, setGuideFinalData } = useMultiStepContext();
    const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
    const [rows, setRows] = useState<Category[]>([]);

    const columns = [
        { key: "categoryName", label: "CATEGORY NAME" }
    ];

    useEffect(() => {
        getAllCategory().then(res => {
            console.log("fetch response: ", res);
            setRows(res);
        });
    }, []);

    useEffect(() => {
        console.log("useEffect: ", rows);
    }, [rows]);

    const handleNext = () => {
        const newUserData = { ...guideUserData, selectedTechnologies };
        setGuideUserData(newUserData);
        setGuideCurrentStep(prevStep => prevStep + 1);
    };

    const handlePrev = () => {
        setGuideCurrentStep(prevStep => prevStep - 1);
    };

    const handleSubmit = () => {
        setGuideFinalData([...guideFinalData, { selectedTechnologies }]);
        // handle actual form submission logic here
    };

    return (
        <div className="flex justify-center items-center">
            <section className="w-6/12">
                <div className="flex flex-col gap-4">
                    <h2>Select Technologies</h2>
                    <ParentTechnologySet
                        selectedTechnologies={selectedTechnologies}
                        setSelectedTechnologies={setSelectedTechnologies}
                    />
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <SelectCategory rows={rows} columns={columns} />
                </div>
                <div className="flex gap-4 mt-4">
                    <Button className="bg-blue-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-blue-600 transition duration-300" onClick={handlePrev}>
                        Prev
                    </Button>
                    <Button className="bg-red-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-red-600 transition duration-300" onClick={handleSubmit}>
                        Create my Account
                    </Button>
                </div>
            </section>
        </div>
    );
}
