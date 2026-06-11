import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "./providers";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "AlgoFlow",
  description: "AlgoFlow- Visualizing Algorithms and Data Structures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased bg-bg-primary transition-colors duration-300 ease-in-out`}
      >
        <Providers>
            <Header />
            {children}
            <Footer />
        </Providers>
      </body>
    </html>
  );
}