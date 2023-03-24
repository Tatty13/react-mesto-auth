import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionWithForm from "./SectionWithForm";
import useInput from "../hooks/useInput";
import useValidation from "../hooks/useValidation";
import { authApi } from "../utils/api";

function Login({ onLogin, onError }) {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values: loginData, handleInputChange } = useInput({
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
      .login(loginData)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        onLogin(loginData.email);
        navigate("/", { replace: true });
      })
      .catch(onError)
      .finally(() => setLoading(false));
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
          className={`form__input form__input_theme_dark ${
            isInputsValid.email === false && "form__input_invalid"
          }`}
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
          className={`form__input form__input_theme_dark ${
            isInputsValid.password === false && "form__input_invalid"
          }`}
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
