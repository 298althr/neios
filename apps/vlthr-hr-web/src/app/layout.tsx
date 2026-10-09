import "./globals.css";
import { Suspense } from "react";
import Nav from "./Nav";
import CursorOverlay from "./CursorOverlay";

export const metadata = {
  title: "NEIOS — N-ATLAS Enterprise Integration OS",
  description:
    "A governed integration layer for organisations deploying N-ATLAS-powered AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topnav">
          <div className="brand">NEI<em>OS</em></div>
          <Nav />
          <div className="status-pill">MODEL <b>N-ATLaS Q4_K_M</b> · GOVERNED</div>
        </header>
        <div className="shell">{children}</div>
        <Suspense>
          <CursorOverlay />
        </Suspense>
      </body>
    </html>
  );
}
