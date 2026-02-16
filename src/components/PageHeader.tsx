import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: ReactNode;
  Icon?: ReactNode;
  iconColor?: string; // tailwind bg color class
  children?: ReactNode; // action area (optional)
};

export default function PageHeader({
  title,
  subtitle,
  Icon,
  iconColor = "bg-gray-200",
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {Icon && (
            <div
              className={`rounded-lg p-2 shadow-lg text-white ${iconColor} flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12`}
            >
              {Icon}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl tracking-tight">{title}</h1>
        </div>
        {subtitle && (
          <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2 mt-3 sm:mt-0">{children}</div>
      )}
    </div>
  );
}
