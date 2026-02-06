import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-white text-black dark:bg-black dark:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
