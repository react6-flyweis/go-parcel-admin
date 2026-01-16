import AuthLayout from "@/components/layouts/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPassword() {
  const handleForgotPassword = (data: { email: string }) => {
    // Handle forgot password logic here
    console.log("Forgot password submitted:", data);
    // API call to send reset link
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="No worries! Enter your email and we'll send you reset instructions."
    >
      <ForgotPasswordForm onSubmit={handleForgotPassword} />
    </AuthLayout>
  );
}
