

"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ContextProps {
    currentStep: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    userData: any;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
    finalData: any[];
    setFinalData: React.Dispatch<React.SetStateAction<any[]>>;
    selectedTechnologies: string[];
    setSelectedTechnologies: React.Dispatch<React.SetStateAction<string[]>>;
}


export const MultiStepContext = createContext<ContextProps | undefined>(undefined);

export default function StepContextProvider({ children }: { children: ReactNode }) {
    const [currentStep, setStep] = useState(1);
    const [userData, setUserData] = useState<any>({});
    const [finalData, setFinalData] = useState<any[]>([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

    return (
        <MultiStepContext.Provider
            value={{
                currentStep,
                setStep,
                userData,
                setUserData,
                finalData,
                setFinalData,
                selectedTechnologies,
                setSelectedTechnologies
            }}>
            {children}
        </MultiStepContext.Provider>
    );
}

export function useMultiStepContext() {
    const context = useContext(MultiStepContext);
    if (!context) {
        throw new Error("useMultiStepContext must be used within a StepContextProvider");
    }
    return context;
}
