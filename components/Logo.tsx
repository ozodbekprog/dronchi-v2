import Link from "next/link";
import { LogoMark } from "./Icons";

type LogoProps = {
  href?: string;
  className?: string;
  wordClassName?: string;
};

export default function Logo({ href = "/", className = "brand", wordClassName = "brand-word" }: LogoProps) {
  return (
    <Link href={href} className={className} aria-label="DRONCHI — bosh sahifa">
      <LogoMark />
      <span className={wordClassName}>DRONCHI</span>
      <span className="brand-dot" aria-hidden="true" />
    </Link>
  );
}
