import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="bg-yellow-300 flex-1 py-4">{children}</main>
      <Footer />
    </div>
  );
}
