import type { ReactNode } from "react";
import goParcelLogoFull from "@/assets/go-parcel-logo-full.png";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 to-blue-500 p-4">
      <div className="w-full max-w-md">
        {/* Auth Card */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header with Logo */}
          <div className="bg-linear-to-r from-slate-700 to-slate-600 py-2 text-center">
            <img
              src={goParcelLogoFull}
              alt="GoParcel Logo"
              className="mx-auto h-14"
            />
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">{title}</h2>
              {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
            </div>

            {children}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-4">
          © 2025 GoParcel Technologies. All rights reserved.
        </p>
      </div>
    </div>
  );
}
