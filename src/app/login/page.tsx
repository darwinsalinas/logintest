import { login } from "@/app/lib/auth";
import { redirect } from "next/navigation";

const Login: React.FC = () => {
  async function handleSubmit(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const token = await login(email, password);
    if (token) {
      redirect("/admin");
    }
  }

  return (
    <form action={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
