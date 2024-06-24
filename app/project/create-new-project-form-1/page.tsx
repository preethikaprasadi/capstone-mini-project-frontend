"use client";
import React, {useState} from "react";
import {saveProject} from "@/service/project.service";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/react";

export default function CreateNewProjectForm1({onSave}) {

    const [titleValue, setTitleValue] = useState("");
    const [summeryValue, setSummeryValue] = useState("");
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const onSubmit = async () => {

        const res = await saveProject({
            id: "",
            title: titleValue,
            summary: summeryValue,
            student: "6629057e417621220cbc963a",
            technology: selectedTechnologies,
        });

        onSave(res);
        clearForm();
    };


    const clearForm = () => {
        setTitleValue("");
        setSummeryValue("");
        setSelectedTechnologies([]); // Clear the selectedTechnologies array
    };




    return(
        <>
            <div className={"flex flex-col items-center gap-4"}>
                 <h1 className={""}> Create New Project</h1>


            <div className={"flex flex-col gap-3"}>
            <Input
                isDisabled
                value={titleValue}
                type="text"
                label="Title"
                className="max-w-xs"
                onChange={(e) => setTitleValue(e.target.value)}
                onClear={() => console.log("input cleared")}
            />

            <Input
                isDisabled
                value={summeryValue}
                type="text"
                label="Summery"
                defaultValue="junior@nextui.org"
                className="max-w-xs"
                onChange={(e) => setSummeryValue(e.target.value)}
                onClear={() => console.log("input cleared")}
            />
            </div>
            <div>
                <Button color="primary" type="submit" onPress={onSubmit}>
                    Create Account
                </Button>
            </div>
            </div>

        </>
    )

}