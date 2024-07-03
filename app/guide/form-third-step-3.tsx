"use client";
import React, {useContext, useEffect, useState} from 'react';
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import {  useMultiStepContext } from "@/app/step-context";
import SelectCategory from "@/app/category/select-category";
import {Category, getAllCategory} from "@/service/category.service";

export default function GuideFormThirdStep() {
    const { setGuideCurrentStep, guideUserData, setGuideUserData, guideFinalData, setGuideFinalData } = useMultiStepContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rows, setRows]: [Category[], React.Dispatch<(prevRows: Category[]) => Category[]>]= useState([]);


    const columns: Column[] = [
        {
            key: "categoryName",
            label: "CATEGORYNAME",
        }
    ];

    useEffect(() => {
        getAllCategory().then(
            (        res: Category[]) => {
                console.log("fetch response: ", res);
                setRows((prevRows: Category[]) => res);
            }
        )
    }, []);

    useEffect(() => {
        console.log("useEffect: ", rows);
    }, [rows]);

    const handleSave = (category: Category) => {
        console.log("Trying to save: ", category);
        setRows((prevRows: Category[]) => [...prevRows, category]);
    };


    const handlePrev = () => {
        setGuideCurrentStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = () => {
        setGuideFinalData([...guideFinalData, { email, password }]);
        // handle actual form submission logic here
    };

    return (
        <div className="flex justify-center items-center">
            <section className="w-6/12">
                <div className="flex flex-col gap-2">
                    <SelectCategory  rows={rows}
                                     columns={columns}/>
                </div>
                <div className="flex flex-col gap-4">
                    <br/>
                    
                    <Button radius="full" variant="shadow" color="primary" onClick={handlePrev}>
                        Prev
                    </Button>
                    <Button radius="full" variant="shadow" color="danger">
                        Submit
                    </Button>
                </div>
            </section>
        </div>
    );
}


