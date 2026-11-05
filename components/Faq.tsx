"use client";

import { useId, useState } from "react";
import type { Faq as FaqItem } from "@/lib/data";

type FaqProps = {
  items: FaqItem[];
  defaultOpen?: number;
  foot?: React.ReactNode;
};

export default function Faq({ items, defaultOpen, foot }: FaqProps) {
  const baseId = useId();
  const initial =
    typeof defaultOpen === "number"
      ? defaultOpen
      : items.findIndex((item) => item.open);
  const [open, setOpen] = useState<number>(initial >= 0 ? initial : -1);

  return (
    <>
      <div className="faq-list">
        {items.map((item, index) => {
          const isOpen = open === index;
          const buttonId = `${baseId}-q-${index}`;
          const panelId = `${baseId}-a-${index}`;
          return (
            <div key={item.q} className={`faq-item${isOpen ? " is-open" : ""}`}>
              <button
                type="button"
                id={buttonId}
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                {item.q}
                <span className="faq-icon" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div id={panelId} className="faq-a" role="region" aria-labelledby={buttonId}>
                <div className="faq-a-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {foot && <p className="faq-foot">{foot}</p>}
    </>
  );
}
