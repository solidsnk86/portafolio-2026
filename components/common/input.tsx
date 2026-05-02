import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = "", type = "text", ...props },
  ref,
) {
  const baseClasses =
    "h-10 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-offset-white placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10";

  return (
    <input
      ref={ref}
      type={type}
      className={[baseClasses, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
});

Input.displayName = "Input";