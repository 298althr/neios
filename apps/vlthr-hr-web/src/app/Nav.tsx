"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Intake" },
  { href: "/approvals", label: "Approvals" },
  { href: "/audit", label: "Audit" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="nav">
      {LINKS.map((l) => (
        <Link key={l.href} href={l.href} className={path === l.href ? "active" : ""}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
