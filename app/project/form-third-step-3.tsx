"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import { useMultiStepContext } from "@/app/step-context";
import SelectCategory from "@/app/category/select-category";
import { Category, getAllCategory } from "@/service/category.service";
import { Project, saveProject } from "@/service/project.service";

function FormThirdStep() {
    const { setStep, userData, setUserData, finalData, setFinalData, selectedCategories, setSelectedCategories } = useMultiStepContext();
    const [rows, setRows] = useState([]);

    const columns = [
        {
            key: "categoryName",
            label: "CATEGORYNAME",
        }
    ];

    useEffect(() => {
        getAllCategory().then((res) => {
            console.log("fetch response: ", res);
            setRows(res);
        });
    }, []);

    useEffect(() => {
        console.log("useEffect: rows: ", rows);
    }, [rows]);

    const handlePrev = () => {
        const newUserData = { ...userData, selectedCategories: Array.from(new Set(selectedCategories)) };
        setUserData(newUserData);
        setStep(prevStep => prevStep - 1);
        console.log("Current userData (Prev):", newUserData);
    };

    // const submitData = () => {
    //     const newUserData = { ...userData, selectedCategories: Array.from(new Set(selectedCategories)) };
    //     setUserData(newUserData);
    //
    //     // Using callback to ensure the state is updated before setting finalData
    //     setUserData((prevUserData) => {
    //         const updatedUserData = { ...prevUserData, selectedCategories: Array.from(new Set(selectedCategories)) };
    //         const newFinalData = [...finalData, updatedUserData];
    //         setFinalData(newFinalData);
    //         console.log("finalData:", newFinalData);
    //         console.log("You have successfully submitted data");
    //         onSubmit(updatedUserData);
    //         return {};
    //     });
    //
    //     setStep(1);
    // };
    const submitData = async () => {
        const newUserData = { ...userData, selectedCategories: Array.from(new Set(selectedCategories)) };

        try {
            // Save project data
            console.log("Project data being sent to server:", newUserData);
            const res = await saveProject({
                id: "",
                title: newUserData.titleValue,
                summary: newUserData.summeryValue,
                student: "6629057e417621220cbc963a",
                technology: newUserData.selectedTechnologies,
                category: newUserData.selectedCategories,
            });
            console.log("Response from saveProject:", res);

            // Update finalData with the newUserData
            setFinalData(prevFinalData => [...prevFinalData, newUserData]);
            console.log("finalData:", [...finalData, newUserData]);

            // Move to the next step
            setStep(1);

            console.log("You have successfully submitted data");
        } catch (error) {
            console.error("Error in onSubmit:", error);
        }
        setUserData("");
    };

    return (
        <div className="flex justify-center items-center">
            <section className="w-6/12">
                <div className="flex flex-col gap-2">
                    <SelectCategory
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        rows={rows}
                        columns={columns}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <br />
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
