import '../styles/globals.css';

export const metadata = {
  title: "My App",
  description: "An example of Route Groups in Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}