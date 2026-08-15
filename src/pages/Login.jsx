import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    console.log(loginFormData);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <section className="login-container">
      <h1>Sign in to your account</h1>
      <form className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={loginFormData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginFormData.password}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Log in</button>
      </form>
    </section>
  );
}
