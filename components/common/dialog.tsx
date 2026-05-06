import { ReactNode } from "react";
import { createRoot, Root } from "react-dom/client";

interface DialogProps {
  content: ReactNode;
  className?: string;
}

export const closeDialog = () => {
  const dialog = document.querySelector("dialog");
  if (dialog && dialog.open) {
    dialog.close();
    dialog.remove();
  }
};

export const showDialog = ({ content, className }: DialogProps) => {
  const dialog = document.createElement("dialog");
  const root = createRoot(dialog);
  const controller = new AbortController();

  document.body.appendChild(dialog);
  dialog.showModal();
  dialog.className = className ?? "";
  root.render(content);

  document.addEventListener(
    "click",
    (e) => {
      const child = dialog.firstElementChild;
      if (dialog && dialog.open && !child?.contains(e.target as Node)) {
        closeDialog();
        root.unmount();
        controller.abort();
      }
    },
    { signal: controller.signal },
  );
};
