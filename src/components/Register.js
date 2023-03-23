import { useState } from "react";
import SectionWithForm from "./SectionWithForm";
import useInput from "../hooks/useInput";
import useValidation from "../hooks/useValidation";

function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const [singupData, setSingupData, handleInputChange] = useInput({
    email: "",
    password: "",
  });

  const { errorMessages, isFormValid, handleValidityChange, resetValidation } =
    useValidation(2);

  const handleChange = e => {
    handleInputChange(e);
    handleValidityChange(e);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <SectionWithForm
      title="Регистрация"
      name="singup"
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isLoading={isLoading}
      submitBtnText="Зарегистрироваться">
      <label>
        <input
          className="form__input form__input_theme_dark"
          type="email"
          name="email"
          placeholder="Email"
          value={singupData.email}
          onChange={handleChange}
          required
        />
        <span className="form__input-error">{errorMessages.email}</span>
      </label>
      <label>
        <input
          className="form__input form__input_theme_dark"
          type="password"
          name="password"
          placeholder="Пароль"
          value={singupData.password}
          onChange={handleChange}
          required
        />
        <span className="form__input-error">{errorMessages.password}</span>
      </label>
    </SectionWithForm>
  );
}

export default Register;
