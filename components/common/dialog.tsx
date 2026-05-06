import { ReactNode } from "react"
import { createRoot } from "react-dom/client";

interface DialogProps {
    content: ReactNode;
    className?: string;
}

export const showDialog = ({ content, className }: DialogProps) => {
    const dialog = document.createElement("dialog");
    const root = createRoot(dialog);

    dialog.showModal();
    dialog.className = className ?? "";
    root.render(content);
}

export const closeDialog = () => {
    const dialog = document.querySelector("dialog");
    if (dialog && dialog.open) {
        dialog.close();
        dialog.remove();
    }
}