"use client";

import React, { useEffect, useState } from "react";

import ProjectTable from "@/app/project/project-table";
import { getAllProject, Project } from "@/service/project.service";
import { ProjectAddPopup } from "@/app/project/project-add-popup";
import {subtitle, title} from "@/app/components/primitives";
import {Button} from "@nextui-org/react";


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
    },
  ];

  const [rows, setRows]: [
    Project[],
    React.Dispatch<(prevRows: Project[]) => Project[]>,
  ] = useState([]);

  useEffect(() => {
    getAllProject().then((res) => {
      console.log("fetch response: ", res);
      setRows((prevRows: Project[]) => res);
    });
  }, []);

  useEffect(() => {
    console.log("useEffect: ", rows);
  }, [rows]);

  const handleSave = (project: Project) => {
    console.log("Trying to save: ", project);
    setRows((prevRows: Project[]) => [...prevRows, project]);
  };

  const handleDelete = (id: string) => {
    console.log("Trying to delete: ", id);
    setRows((prevRows: Project[]) => prevRows.filter((item) => item.id !== id));
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">

      <div className="inline-block text-center justify-center ">
        <h1 className={title()}>Discover Your Perfect Guide</h1>
        <br />
        <h1 className={title()}>for Your Project with <span style={{ color: '#9333ea' }}>Guidely</span></h1>
        <br />
        <br />
        <hr className="m-3 w-3/4 mx-auto border-t-1 border-blue-500 pb-5" style={{ borderColor: '#9333ea' }} />
      </div>


          <div className={"text-center pl-20 pr-20 mr-5 ml-5 text-violet-100/70 font-light"}>
            Discover your perfect guide for your IT project with Guidely!
            Our platform connects university undergraduate students with experienced mentors,
            offering personalized support to help you succeed. With advanced filtering options,
            you can easily find guides based on specific skills, ensuring you get the expertise you need.
            Enhance your project with tailored guidance from verified professionals and reach new heights in your academic journey.
            Create your project here and take the first step towards achieving your project goals!
          </div>

        <div className={"flex flex-row gap-3 mt-8"}>
          <Button color={"secondary"} radius="full" className=" text-white shadow-lg text-lg font-semibold p-7">Create New Project</Button>
          <Button color={"secondary"} variant="bordered" radius="full" className="  text-white shadow-lg text-lg font-semibold p-7" >View Existing Projects</Button>
        </div>




      {/*<ProjectAddPopup onSave={handleSave} />*/}
      {/*<ProjectTable columns={columns} rows={rows} onDelete={handleDelete} />*/}
      </section>
    </>

  );
}
