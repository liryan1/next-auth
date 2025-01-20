import NavMenu from "@/components/NavMenu";
import SessionProvider from "@/components/SessionProvider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import "./globals.css";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

const font = Poppins({ subsets: ["latin"], weight: ["200", "400", "500", "600", "800"] });

export const metadata: Metadata = {
  title: "Auth Template",
  description: "Template for Sign up and Login using Next Auth",
  authors: [{name: "Ryan Li", url: "https://github.com/liryan1"}],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <SessionProvider session={session}>
          <main className="mx-auto text-2xl flex gap-2">
            <NavMenu />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
