import React from "react";
import { Steps } from "rsuite";

export interface StepperProps {
  steps: { title: string; description?: string }[];
  currentStep: number;
}

const stepper: React.FC<StepperProps> = ({ steps, currentStep }) => (
  <div>
    <Steps current={currentStep}>
      {steps.map((el) => (
        <Steps.Item title={el.title} description={el.description} />
      ))}
    </Steps>
  </div>
);

export default stepper;
