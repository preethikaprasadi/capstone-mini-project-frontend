// import React, {useContext} from "react";
//
// import FormFirstStep from "@/app/project/form-first-step-1";
// import FormSecondStep2 from "@/app/project/form-second-step-2";
// import Stepper from '@mui/material/Stepper';
// import {Step, StepLabel} from "@mui/material";
//
// import {Box} from "@mui/system";
// import FormThirdStep3 from "@/app/project/form-third-step-3";
// import {multiStepContext} from "@/app/step-context";
//
//
// const steps = [
//   'Add title and summary',
//   'Select Technology Stack',
//   'Select Category',
// ];
// export default  function Page() {
//   const [currentStep, finalData]=useContext(multiStepContext);
//
//   function showStep(step){
//     switch(step){
//       case 1:
//         return <FormFirstStep/>
//       case 2:
//         return <FormSecondStep2/>
//       case 3:
//         return <FormThirdStep3/>
//     }
//
//   }
//   return (
//     <>
//       <div>
//         <div className={"flex flex-col justify-center items-center p-0 m-0  gap-8"}>
//           <h1>Create New Project</h1>
//
//           <Box sx={{ width: '100%' }}>
//             <Stepper   activeStep={currentStep-1} alternativeLabel>
//               {steps.map((label) => (
//                   <Step  key={label}>
//                     <StepLabel className={"text-white"} >{label}</StepLabel>
//                   </Step>
//               ))}
//             </Stepper>
//           </Box>
//         </div>
//
//         <br/>
//         <br/>
//         {showStep(currentStep)}
//
//
//           {/*<FormFirstStep />*/}
//
//           {/*<FormSecondStep2 />*/}
//
//           {/*<FormThirdStep3 />*/}
//
//       </div>
//
//
//     </>
//   );
// }
//
// export default Page;
"use client";

import React, { useContext } from "react";

import Stepper from '@mui/material/Stepper';
import { Step, StepLabel } from "@mui/material";
import { Box } from "@mui/system";
import { MultiStepContext } from "@/app/step-context";
import FormThirdStep3 from "@/app/project/form-third-step-3";
import FormSecondStep2 from "@/app/project/form-second-step-2";
import FormFirstStep from "@/app/project/form-first-step-1";

const steps = ['Add title and summary', 'Select Technology Stack', 'Select Category'];

export default function Page() {
  const context = useContext(MultiStepContext);

  if (!context) {
    throw new Error("MultiStepContext must be used within a StepContext");
  }

  const { currentStep } = context;

  function showStep(step: number) {
    switch (step) {
      case 1:
        return <FormFirstStep />;
      case 2:
        return <FormSecondStep2 />;
      case 3:
        return <FormThirdStep3 />;
      default:
        return null;
    }
  }

  return (
      <>
        <div>
          <div className="flex flex-col justify-center items-center p-0 m-0 gap-8">
            <h1>Create New Project</h1>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={currentStep - 1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel className="text-white">{label}</StepLabel>
                    </Step>
                ))}
              </Stepper>
            </Box>
          </div>
          <br />
          <br />
          {showStep(currentStep)}
        </div>
      </>
  );
}
