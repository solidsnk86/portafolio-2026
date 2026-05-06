import { X } from "lucide-react";
import { ReactNode } from "react";
import { createRoot } from "react-dom/client";

interface DialogProps {
  content: ReactNode;
  className?: string;
}

export const showDialog = ({ content, className }: DialogProps) => {
  const dialog = document.createElement("dialog");
  const root = createRoot(dialog);
  const controller = new AbortController();

  document.body.appendChild(dialog);
  dialog.showModal();
  dialog.className = className ?? "";
  root.render(
    <article className="p-5 border border-border-color relative">
      <div className="absolute top-1 right-1">
        <X size={17} className="text-muted-foreground" onClick={() => closeDialog()} />
      </div>
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
    { signal: controller.signal },
  );
};

export function closeDialog() {
  const dialog = document.querySelector("dialog");
  if (dialog && dialog.open) {
    dialog.close();
    dialog.remove();
  }
}
