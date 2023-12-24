import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Container from "@/components/landing/container";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "kzbuyer - бренд может быть дешевым",
  description: "clubbie.club -> загугли",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>
          <nav className="relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
            {/* menu  */}
            <div className="text-center flex items-center">
              <Link href={"/"}>
                <ul className="items-center text-4xl font-semibold justify-end flex-1 list-none lg:pt-0 lg:flex">
                  KZBuyer
                </ul>
              </Link>
            </div>

            {/* <div className=" mr-3 space-x-4 flex items-center justify-center">
              <Button variant="outline">Tommy</Button>
              <Button className="btn">Guess</Button>
            </div> */}
          </nav>
        </Container>
        {children}
      </body>
    </html>
  );
}
