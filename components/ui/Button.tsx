import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "ghost-navy" | "line" | "primary-on-green";

const variantClasses: Record<Variant, string> = {
  primary: "bg-green text-white hover:bg-green-hover",
  "primary-on-green": "bg-white text-green hover:bg-neutral",
  "ghost-navy":
    "border border-white/35 text-white hover:bg-white/10",
  line: "border border-line text-navy-2 bg-white hover:border-navy-2",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center gap-2 font-semibold text-sm px-6 py-[13px] rounded-sm transition-transform duration-150 ease-out hover:-translate-y-px";
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
