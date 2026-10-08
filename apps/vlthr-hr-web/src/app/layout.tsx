export const metadata = {
  title: "NEIOS — N-ATLAS Enterprise Integration OS",
  description:
    "A governed integration layer for organisations deploying N-ATLAS-powered AI.",
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
