import { useState } from "react";
import { useLoaderData, useNavigate, Form, redirect } from "react-router-dom";
import { loginUser } from "../api";
export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}
export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const data = await loginUser({ email, password });
    console.log(data);
    localStorage.setItem("loggedIn", true);
    return redirect("/host");
  } catch (err) {
    console.log("error:", err);
    return null;
  }
}
export default function Login() {
  const message = useLoaderData();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     setStatus("submitting");
  //     setError(null);
  //     loginUser(loginFormData)
  //       .then((data) => navigate("/host", { replace: true }))
  //       .catch((err) => {
  //         setError(err);
  //       })
  //       .finally(() => setStatus("idle"));
  //   }
  //   function handleChange(e) {
  //     const { name, value } = e.target;
  //     setLoginFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  return (
    <section className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {error && <h3 className="red">{error.message}</h3>}
      <Form className="login-form" method="post" replace>
        <input type="email" name="email" placeholder="Email address" />
        <input type="password" name="password" placeholder="Password" />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </section>
  );
}
