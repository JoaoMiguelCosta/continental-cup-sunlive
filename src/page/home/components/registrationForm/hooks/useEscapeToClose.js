import { useEffect } from "react";

export function useEscapeToClose(isOpen, onClose, disabled = false) {
  useEffect(() => {
    if (!isOpen || disabled) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, disabled]);
}
