import { useState } from "react";

export function useForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function nextStep() {
    setCurrentStepIndex(index => {
      if (index >= steps.length - 1) {
        return index;
      }
      return index + 1;
    });
  }

  function prevStep() {
    setCurrentStepIndex(index => {
      if (index <= 0) {
        return index;
      }
      return index - 1;
    });
  }

  return {
    currentStepIndex,
    stepComponent: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    nextStep,
    prevStep
  }
}