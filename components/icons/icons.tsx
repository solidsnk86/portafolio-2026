import { ComponentProps } from "react";

export const NeonIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      viewBox="0 0 28 28"
      width={64}
      height={64}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27.5421 0.00778666V28L16.7953 18.4918V27.8154H0V0L27.5421 0.00778666ZM3.3761 24.4393H13.4192V11.0836L24.1661 20.5916V3.38289L3.3761 3.37693V24.4393Z"
        fill="currentColor"
      />
    </svg>
  );
};
