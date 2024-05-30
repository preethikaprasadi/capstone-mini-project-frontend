"use client";

import ProjectTable from "@/app/project/project-table";
import {getAllProject, Project, saveProject} from "@/service/project.service";
import React, {useEffect, useState} from "react";
import {ProjectAddPopup} from "@/app/project/project-add-popup";


export default function ProjectPage() {

    const columns: Column[] = [
        {
            key: "id",
            label: "ID",
        },
        {
            key: "title",
            label: "TITLE",
        },
        {
            key: "summary",
            label: "SUMMARY",
        },
        {
            key: "action",
            label: "Action",
        }
    ];

    const [rows, setRows]: [Project[], (rows: Project[]) => void] = useState([]);

    useEffect(() => {
        getAllProject().then((res: Project[]) => {
            setRows(res);
        });
    }, []);

    const handleSave = (project: Project)=> {
        rows.push(project);
        setRows([...rows]);
    }

    const handleEdit = (project: Project)=> {
        const updatedRows = rows.map(pro => pro.id === project.id ? project : pro);
        setRows(updatedRows);
    }

    const handleDelete = (id: string) => {
        const updatedRows = rows.filter(project => project.id !== id);
        setRows(updatedRows);
    }



  return (
      <>
        <ProjectAddPopup onSave={handleSave}/>
        <ProjectTable rows={rows} columns={columns} onDelete={handleDelete} onEdit={handleEdit}/>
      </>
  );
}
