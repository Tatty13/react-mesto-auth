import { useState, useEffect, useCallback } from "react";

//валидация реализована после ревью ПР11, буду благодарна за комментарии
function useValidation(requirednputsCount) {
  const [errorMessages, setErrorMessages] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isInputsValid, setInputsValidity] = useState({});

  const handleValidityChange = e => {
    setErrorMessages(messages => ({
      ...messages,
      [e.target.name]: e.target.validationMessage,
    }));

    setInputsValidity(inputs => ({
      ...inputs,
      [e.target.name]: e.target.validity.valid,
    }));
  };

  useEffect(() => {
    const errors = Object.values(errorMessages);
    setIsFormValid(
      errors.length >= requirednputsCount && errors.every(error => error === "")
    );
  }, [errorMessages, requirednputsCount]);

  const resetValidation = useCallback(() => {
    setErrorMessages({});
    setInputsValidity({});
  }, []);

  return {
    errorMessages,
    isFormValid,
    isInputsValid,
    handleValidityChange,
    resetValidation,
  };
}

export default useValidation;
