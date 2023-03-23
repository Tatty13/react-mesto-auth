import { useState } from "react";
import Form from "./Form";
import SectionWithForm from "./SectionWithForm";
import useInput from "../hooks/useInput";
import useValidation from "../hooks/useValidation";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData, handleInputChange] = useInput({
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
      title="Вход"
      name="login"
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isLoading={isLoading}
      submitBtnText="Войти">
      <label>
        <input
          className="form__input form__input_theme_dark"
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
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
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <span className="form__input-error">{errorMessages.password}</span>
      </label>
    </SectionWithForm>
  );
}

export default Login;
