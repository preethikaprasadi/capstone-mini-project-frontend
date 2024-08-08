"use client";

import React from 'react';
import { useMultiStepContext } from "@/app/step-context";

const GuideList = () => {
  const { finalData } = useMultiStepContext();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Submission Details</h1>
      {finalData.length > 0 ? (
        finalData.map((data, index) => (
          <div key={index} className="mb-6 p-4 border rounded shadow-md">
            <h2 className="text-xl font-semibold">Project {index + 1}</h2>
            <p><strong>Title:</strong> {data.titleValue}</p>
            <p><strong>Summary:</strong> {data.summeryValue}</p>
            <p><strong>Technologies:</strong> {data.selectedTechnologies.join(', ')}</p>
            <p><strong>Categories:</strong> {data.selectedCategories.join(', ')}</p>
          </div>
        ))
      ) : (
        <p>No data submitted yet.</p>
      )}
    </div>
  );
};

export default GuideList;
