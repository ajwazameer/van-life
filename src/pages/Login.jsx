import { useEffect } from "react";
import {
  useLoaderData,
  useNavigate,
  useNavigation,
  Form,
  useActionData,
} from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const path = new URL(request.url).searchParams.get("redirectTo") || "";
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    await loginUser({ email, password });
    localStorage.setItem("loggedIn", "true");
    console.log("i am in action func", path);
    return { success: true, pathname: path }; // NOT redirect()
  } catch (err) {
    return { error: err.message || "Login failed" };
  }
}

export default function Login() {
  const message = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    if (actionData?.success) {
      console.log("i m in use effect", actionData.pathname);
      navigate(`${actionData.pathname}`, { replace: true });
    }
  }, [actionData, navigate]);

  return (
    <section className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {actionData?.error && <h3 className="red">{actionData.error}</h3>}
      <Form className="login-form" method="post">
        <input type="email" name="email" placeholder="Email address" />
        <input type="password" name="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </section>
  );
}
