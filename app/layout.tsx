import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const metadata: Metadata = {
  title: "JurisLens AI - Legal Document Summarization",
  description: "AI-powered legal document summarization tool for professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-[#0A0F1C] overflow-x-hidden`}
      >
        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-[#0A0F1C] via-[#0E121B] to-[#0A0F1C]" />
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

      </body>
    </html>
  );
}
