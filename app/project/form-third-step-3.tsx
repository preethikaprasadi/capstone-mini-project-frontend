"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import { useMultiStepContext } from "@/app/step-context";
import SelectCategory from "@/app/category/select-category";
import { getAllCategory } from "@/service/category.service";
import { useSession } from 'next-auth/react';
import useAxiosAuth from '@/lib/hook/useAxiosAuth';

const FormThirdStep = () => {
  const { setStep, userData, setUserData, finalData, setFinalData, selectedCategories, setSelectedCategories } = useMultiStepContext();
  const [rows, setRows] = useState([]);
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();

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

  const handlePrev = () => {
    const newUserData = { ...userData, selectedCategories: Array.from(new Set(selectedCategories)) };
    setUserData(newUserData);
    setStep(prevStep => prevStep - 1);
    console.log("Current userData (Prev):", newUserData);
  };

  const submitData = async () => {
    const newUserData = { ...userData, selectedCategories: Array.from(new Set(selectedCategories)) };

    try {
      // Save project data
      console.log("Project data being sent to server:", newUserData);
      const res = await axiosAuth.post('/projects', {
        title: newUserData.titleValue,
        summary: newUserData.summeryValue,
        student: session?.user.id || '',
        technology: newUserData.selectedTechnologies,
        category: newUserData.selectedCategories,
      });
      console.log("Response from saveProject:", res.data);

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
};

export default FormThirdStep;
