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
    <div className="flex items-center justify-between">
      <div>
        <div className="flex gap-2">
          <div className={`rounded-lg p-2 shadow-lg text-white ${iconColor}`}>
            {Icon}
          </div>
          <h1 className="text-3xl  tracking-tight">{title}</h1>
        </div>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
