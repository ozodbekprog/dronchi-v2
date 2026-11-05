import type { ReactNode } from "react";

export default function PageHead({
  title,
  text,
  action,
  eyebrow = "Kabinet",
}: {
  title: string;
  text?: string;
  action?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <header className="page-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="page-title">{title}</h1>
        {text && <p className="page-sub">{text}</p>}
      </div>
      {action && <div className="page-head-action">{action}</div>}
    </header>
  );
}
