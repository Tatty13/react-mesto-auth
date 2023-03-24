import { useState } from "react";
import SectionWithForm from "./SectionWithForm";
import useInput from "../hooks/useInput";
import useValidation from "../hooks/useValidation";
import { authApi } from "../utils/api";

function Register({ onSignup, onError }) {
  const [isLoading, setLoading] = useState(false);

  const { values: singupData, handleInputChange } = useInput({
    email: "",
    password: "",
  });

  const { errorMessages, isFormValid, isInputsValid, handleValidityChange } =
    useValidation(2);

  const handleChange = e => {
    handleInputChange(e);
    handleValidityChange(e);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    authApi
      .singup(singupData)
      .then(_ => {
        onSignup();
      })
      .catch(onError)
      .finally(() => setLoading(false));
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
          className={`form__input form__input_theme_dark ${
            isInputsValid.email === false && "form__input_invalid"
          }`}
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
          className={`form__input form__input_theme_dark ${
            isInputsValid.password === false && "form__input_invalid"
          }`}
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
