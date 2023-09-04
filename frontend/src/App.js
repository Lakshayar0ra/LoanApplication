import { useForm } from './utils/useForm';
import LoanForm from './components/LoanForm';
import BalanceSheet from './components/BalanceSheet';
import Outcome from './components/Outcome';
import { useState } from 'react';
import dayjs from 'dayjs';
import React from "react";

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  businessName: "",
  yearEstablished: dayjs(),
  businessAddress: "",
  loanAmount: "",
  accountingProvider: "",
  balanceSheet: []
};

function App() {
  const [formData, setFormData] = useState(INITIAL_DATA);

  function updateFeilds(fields) {
    setFormData(prev => {
      return { ...prev, ...fields };
    });
  }

  function goToNextStep() {
    nextStep();
  }

  // Custom Hook that Provides Multi-Step Form Submission
  const { stepComponent, nextStep } = useForm([
    <LoanForm feilds={formData} updateFeilds={updateFeilds} nextStep={goToNextStep} />,
    <BalanceSheet feilds={formData} updateFeilds={updateFeilds} nextStep={goToNextStep} />,
    <Outcome feilds={formData} />
  ]);

  return (
    <React.Fragment>
      {stepComponent}
    </React.Fragment>
  );
}

export default App;
