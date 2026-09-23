import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tidepool — The Small Web Browser',
  description: 'A quiet, decentralised web living in a database. Handcrafted hypertext, zero telemetry.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-parchment text-ink antialiased selection:bg-terracotta-light selection:text-terracotta-dark">
        {children}
      </body>
    </html>
  );
}
