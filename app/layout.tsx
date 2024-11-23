import { Toaster } from 'sonner';
import '../styles/globals.css';

// export const metadata = {
//   title: "My App",
//   description: "An example of Route Groups in Next.js",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors position="top-right" expand={true} />
        {children}
      </body>
    </html>
  );
}