import React, { useState } from "react";

import CategorizeObjects from "./CategorizeObjects";


const ParentCategorizeObjects = ({ data }) => {
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

  return (
    <>
        <CategorizeObjects
            data={data}
            selectedTechnologies={selectedTechnologies}
            setSelectedTechnologies={setSelectedTechnologies}
        />

    </>
  );
};

export default ParentCategorizeObjects;
