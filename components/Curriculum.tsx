"use client";

import { useState } from "react";
import { fpvModules } from "@/lib/data";
import { ChevronDown } from "./Icons";

export default function Curriculum() {
  const initial = fpvModules.findIndex((item) => "open" in item && item.open);
  const [open, setOpen] = useState(initial >= 0 ? initial : 2);

  return (
    <div className="lesson-list">
      {fpvModules.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.n} className={`lesson-item${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="lesson-head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span className="lesson-num">{item.n}</span>
              <span className="lesson-title">
                <b>{item.title}</b>
                <span>{item.meta}</span>
              </span>
              <ChevronDown size={18} className="lesson-chevron" />
            </button>
            <div className="lesson-body">
              <div className="lesson-body-inner">
                <p>{item.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
