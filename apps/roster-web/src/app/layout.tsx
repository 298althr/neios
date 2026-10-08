export const metadata = {
  title: "VLTHR HR",
  description: "Managed AI Workforce & Governance Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
