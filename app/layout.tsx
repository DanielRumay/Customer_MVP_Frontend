import type { Metadata } from "next";
import "./globals.css";
import React from "react";


export const metadata: Metadata = {
    title: "Tutorify - Asesoría Académica",
    description: "Soluciones académicas personalizadas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
    <head>
        <title>Tutorify</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
    </head>
      <body>
        {children}
      </body>
    </html>
  );
}
