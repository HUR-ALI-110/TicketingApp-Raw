import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
const inter = Inter({ subsets: ["latin"] });

config.autoAddCss = false;
export const metadata = {
  title: "Ticketing App",
  description: "Hey ! This is Ticketing App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen max-h-screen">
          <Navbar />
          <div className="flex-grow overflow-y-auto bg-page text-default-text">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
