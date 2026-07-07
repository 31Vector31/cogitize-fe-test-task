"use client";

import { useCallback, useEffect, useState } from "react";

type UseStepRotationOptions = {
  stepsCount: number;
  intervalMs: number;
  isActive: boolean;
};

export const useStepRotation = ({
  stepsCount,
  intervalMs,
  isActive,
}: UseStepRotationOptions) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!isActive) return undefined;

    const id = setInterval(() => {
      setCurrentStep((step) => (step + 1) % stepsCount);
    }, intervalMs);

    return () => clearInterval(id);
  }, [isActive, intervalMs, stepsCount, cycle]);

  const selectStep = useCallback((step: number) => {
    setCurrentStep(step);
    setCycle((previous) => previous + 1);
  }, []);

  return { currentStep, cycle, selectStep };
};
