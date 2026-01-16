import AuthLayout from "@/components/layouts/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <AuthLayout title="Admin Panel" subtitle="Sign in to access your dashboard">
      <LoginForm />
    </AuthLayout>
  );
}
