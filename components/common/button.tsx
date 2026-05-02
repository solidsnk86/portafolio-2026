import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className = "", type = "button", ...props },
  ref,
) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <button
      ref={ref}
      type={type}
      className={[baseClasses, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
});

Button.displayName = "Button";