"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Close } from "./Icons";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  titleId?: string;
  children: ReactNode;
  wide?: boolean;
};

export default function Modal({ open, onClose, title, titleId, children, wide }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    const timer = window.setTimeout(() => {
      const focusable = modalRef.current?.querySelector<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      focusable?.focus();
    }, 30);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={wide ? { width: "min(760px, 100%)" } : undefined}
      >
        {title && (
          <div className="modal-head">
            <h3 id={titleId}>{title}</h3>
            <button type="button" className="modal-close" onClick={onClose} aria-label="Yopish">
              <Close size={16} />
            </button>
          </div>
        )}
        {!title && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
            <button type="button" className="modal-close" onClick={onClose} aria-label="Yopish">
              <Close size={16} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
