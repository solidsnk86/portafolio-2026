import { ReactNode } from "react";
import { createRoot } from "react-dom/client";

interface DialogProps {
  content: ReactNode;
  width?: string;
  className?: string;
}

export const showDialog = ({ content, width = "50%", className }: DialogProps) => {
  const dialog = document.createElement("dialog");
  const root = createRoot(dialog);
  const controller = new AbortController();

  document.body.appendChild(dialog);
  dialog.showModal();
  dialog.style.width = width;
  dialog.className = className ?? "";
  root.render(
    <article className="p-5 border border-border-color relative">
      {content}
    </article>,
  );

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
    { signal: controller.signal, once: true },
  );
};

export function closeDialog() {
  const dialog = document.querySelector("dialog");
  if (dialog && dialog.open) {
    dialog.close();
    dialog.remove();
  }
}
