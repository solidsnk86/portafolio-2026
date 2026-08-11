import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className = "", type = "button", ...props }, ref) {
    const baseClasses = (className =
      "inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-semibold transition-colors hover:outline-4 hover:outline-indigo-500/70 outline-offset-2");

    return (
      <button
        ref={ref}
        type={type}
        className={[baseClasses, className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
