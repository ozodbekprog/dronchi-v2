import type { CSSProperties } from "react";

type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
  style?: CSSProperties;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function LogoMark({ size = 26, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="1.6" y="1.6" width="8.4" height="8.4" rx="3.2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="14" y="1.6" width="8.4" height="8.4" rx="3.2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="1.6" y="14" width="8.4" height="8.4" rx="3.2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="14" y="14" width="8.4" height="8.4" rx="3.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function ArrowUpRight({ size = 16, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight({ size = 16, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowDown({ size = 16, className, strokeWidth = 2, style }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} style={style}>
      <path d="M12 4v16" />
      <path d="m6 14 6 6 6-6" />
    </svg>
  );
}

export function ChevronDown({ size = 16, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronLeft({ size = 16, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function Play({ size = 12, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5.8v12.4c0 .8.9 1.3 1.6.9l10-6.2a1 1 0 0 0 0-1.8l-10-6.2A1 1 0 0 0 8 5.8Z" />
    </svg>
  );
}

export function Sun({ size = 18, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function Moon({ size = 18, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M20.2 14.2A8.2 8.2 0 0 1 9.8 3.8a8.2 8.2 0 1 0 10.4 10.4Z" />
    </svg>
  );
}

export function Sparkle({ size = 12, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.5c.5 4.8 2.6 7 7.5 7.5-4.9.5-7 2.7-7.5 7.5-.5-4.8-2.6-7-7.5-7.5 4.9-.5 7-2.7 7.5-7.5Z" />
      <path d="M19.5 15.5c.2 2 1.1 3 3 3.2-1.9.2-2.8 1.2-3 3.3-.2-2.1-1.1-3.1-3-3.3 1.9-.2 2.8-1.2 3-3.2Z" opacity=".55" />
    </svg>
  );
}

export function Star({ size = 12, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.6 14.7 9l6.9.6-5.2 4.6 1.5 6.7L12 17.4 6.1 21l1.5-6.7L2.4 9.6 9.3 9 12 2.6Z" />
    </svg>
  );
}

export function Flame({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.4 2.2c.4 3.2-.8 4.7-2.2 6.1-1.3 1.3-2.7 2.7-2.7 5.4a3.5 3.5 0 0 0 7 .2c0-1.5-.6-2.5-1.3-3.5-.6-.9-1.2-1.8-1.3-3.1 2.9 1.8 5.1 4.7 5.1 8.2A9 9 0 1 1 3 12.6c0-4.4 2.2-7.5 5.4-9.4-.1 1.9.6 3.2 1.5 4.2.4-2.2 1.7-4 3.5-5.2Z" />
    </svg>
  );
}

export function Target({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Check({ size = 14, className, strokeWidth = 2.4 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export function CheckCircle({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.4 2.6 2.6L16.4 9" />
    </svg>
  );
}

export function Clock({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 1.9" />
    </svg>
  );
}

export function Calendar({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <rect x="3" y="4.6" width="18" height="16.4" rx="3" />
      <path d="M8 2.8v3.4M16 2.8v3.4M3 9.6h18" />
      <path d="M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 17h2M11 17h2" />
    </svg>
  );
}

export function MapPin({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function Layers({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 17.5 9 5 9-5" />
    </svg>
  );
}

export function BarChart({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 20v-6M13 20V8M18 20v-9" />
    </svg>
  );
}

export function Award({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="9" r="5.4" />
      <path d="m8.7 13.7-1.4 7.1 4.7-2.6 4.7 2.6-1.4-7.1" />
    </svg>
  );
}

export function Cart({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M3 4h2.2l2.3 11.2a1.6 1.6 0 0 0 1.6 1.3h8.7a1.6 1.6 0 0 0 1.6-1.2L21 8H6" />
      <circle cx="9.5" cy="20" r="1.2" />
      <circle cx="17.5" cy="20" r="1.2" />
    </svg>
  );
}

export function Close({ size = 18, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Menu({ size = 20, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  );
}

export function Eye({ size = 18, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOff({ size = 18, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M4 4l16 16" />
      <path d="M9.6 6.1A9.8 9.8 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.8 3.6M6.1 7.6A16.6 16.6 0 0 0 2.5 12S6 18.5 12 18.5c1.5 0 2.8-.4 4-.9" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

export function User({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20.2c1-3.6 3.9-5.5 7.5-5.5s6.5 1.9 7.5 5.5" />
    </svg>
  );
}

export function Shield({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M12 2.8 20 6v6.2c0 4.6-3.4 7.7-8 9-4.6-1.3-8-4.4-8-9V6l8-3.2Z" />
      <path d="m8.4 12 2.4 2.4 4.8-4.8" />
    </svg>
  );
}

export function Info({ size = 15, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.2M12 7.6v.2" />
    </svg>
  );
}

export function Monitor({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <rect x="2.5" y="4" width="19" height="13" rx="2.4" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function Compass({ size = 22, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z" />
    </svg>
  );
}

export function GraduationCap({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="m12 4 10 5-10 5L2 9l10-5Z" />
      <path d="M6 11.2V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.8" />
    </svg>
  );
}

export function BookOpen({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M12 6.2C10.4 4.9 8.2 4.2 4 4.2v14.4c4.2 0 6.4.7 8 2 1.6-1.3 3.8-2 8-2V4.2c-4.2 0-6.4.7-8 2Z" />
      <path d="M12 6.2v14.4" />
    </svg>
  );
}

export function Download({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function Send({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.3 3.2 2.9 10.5c-1 .4-1 1.8.1 2.1l4.6 1.4 1.7 5.2c.3.9 1.4 1.1 2 .4l2.6-2.9 4.4 3.2c.7.5 1.7.1 1.9-.7l3-14.5c.2-1-.8-1.8-1.9-1.5Z" />
    </svg>
  );
}

export function Instagram({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTube({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22.5 7.2a3 3 0 0 0-2.1-2.1C18.6 4.6 12 4.6 12 4.6s-6.6 0-8.4.5A3 3 0 0 0 1.5 7.2 31 31 0 0 0 1 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.8.5 8.4.5 8.4.5s6.6 0 8.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23 12a31 31 0 0 0-.5-4.8ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z" />
    </svg>
  );
}

export function MapFold({ size = 26, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="m9 4 6 2 5-2v14l-5 2-6-2-5 2V6l5-2Z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

export function Wind({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M3 8h9.5a2.8 2.8 0 1 0-2.8-2.8" />
      <path d="M3 12.5h14.5a2.8 2.8 0 1 1-2.8 2.8" />
      <path d="M3 17h6.5" />
    </svg>
  );
}

export function Refresh({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M20 11a8 8 0 1 0-2.3 6.3" />
      <path d="M20 5v6h-6" />
    </svg>
  );
}

export function Card({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="3" />
      <path d="M2.5 10h19" />
      <path d="M6.5 15h3" />
    </svg>
  );
}

export function ChevronRight({ size = 14, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function Bell({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M10.3 21a1.9 1.9 0 0 0 3.4 0" />
    </svg>
  );
}

export function Globe({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.1-3.3-8.5S9.8 5.8 12 3.5Z" />
    </svg>
  );
}

export function Users({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20" />
      <circle cx="10" cy="7.5" r="3.5" />
      <path d="M20 20v-1.4a4 4 0 0 0-3-3.8M15.2 4.2a3.5 3.5 0 0 1 0 6.6" />
    </svg>
  );
}

export function Ruler({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M4 15.5 15.5 4 20 8.5 8.5 20 4 15.5Z" />
      <path d="m7 12.5 1.8 1.8M10 9.5l1.8 1.8M13 6.5l1.8 1.8" />
    </svg>
  );
}

export function Search({ size = 14, className, strokeWidth = 1.9 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.3 15.3 4.2 4.2" />
    </svg>
  );
}

export function Plus({ size = 14, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function News({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <path d="M5 5h11a2 2 0 0 1 2 2v12H7a2 2 0 0 1-2-2V5Z" />
      <path d="M18 9h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1M8 9h7M8 13h7M8 17h4" />
    </svg>
  );
}

export function Lock({ size = 16, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
      <circle cx="12" cy="15.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
