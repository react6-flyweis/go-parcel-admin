import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Send, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onSubmit?: (data: ForgotPasswordFormValues) => void;
}

export default function ForgotPasswordForm({
  onSubmit,
}: ForgotPasswordFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (data: ForgotPasswordFormValues) => {
    console.log("Forgot password data:", data);
    setSubmittedEmail(data.email);
    setIsSuccess(true);
    onSubmit?.(data);
  };

  const handleResend = () => {
    if (submittedEmail) {
      console.log("Resending email to:", submittedEmail);
      onSubmit?.({ email: submittedEmail });
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-5">
        {/* Success Message */}
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertDescription className="ml-2">
            <p className="font-semibold text-green-800 mb-1">
              Email Sent Successfully!
            </p>
            <p className="text-sm text-gray-600">
              We've sent password reset instructions to{" "}
              <span className="font-medium">{submittedEmail}</span>. Please
              check your inbox and spam folder.
            </p>
          </AlertDescription>
        </Alert>

        {/* Resend Button */}
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="w-full h-12 font-semibold border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
          onClick={handleResend}
        >
          Resend Email
        </Button>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>

        {/* Support Notice */}
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
          <p className="text-xs text-gray-600">
            <span className="font-semibold text-gray-700">Need help?</span>{" "}
            Contact support at{" "}
            <a
              href="mailto:support@goparcel.com"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              support@goparcel.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">
                Email Address
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 h-11 bg-gray-50 border-gray-200"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Send Reset Link Button */}
        <Button
          size="lg"
          type="submit"
          className="w-full h-12 bg-green-500 hover:bg-green-600 shadow-lg font-semibold"
        >
          <Send className="mr-2 h-5 w-5" />
          Send Reset Link
        </Button>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>

        {/* Support Notice */}
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
          <p className="text-xs text-gray-600">
            <span className="font-semibold text-gray-700">Need help?</span>{" "}
            Contact support at{" "}
            <a
              href="mailto:support@goparcel.com"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              support@goparcel.com
            </a>
          </p>
        </div>
      </form>
    </Form>
  );
}
