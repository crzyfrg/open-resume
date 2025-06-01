import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Footer } from "components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";

export const metadata = {
  title: "Make My Resume - Professional Resume Builder and Parser",
  description:
    "Make My Resume is a powerful resume builder that allows anyone to create a modern professional resume in 3 simple steps. For those who have an existing resume, Make My Resume also provides a resume parser to help test and confirm its ATS readability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <TopNavBar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
