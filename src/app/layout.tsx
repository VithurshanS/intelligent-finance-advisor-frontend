// RootLayout (globals/layout.tsx)
import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {ToastContainer} from "react-toastify";
import {ThemeProvider} from "@/components/ThemeProvider";
// import {Geist} from "next/font/google";


export const metadata: Metadata = {
    title: "Intelligent Personal Finance Assistant",
    description: "Intelligent Personal Finance Assistant",
};

// const geist = Geist({
//     subsets: ["latin"],
//     variable: "--font-geist",
// });


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={'bg-background h-screen w-screen flex'}>
        <div className={'w-full h-full'}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </div>
        <ToastContainer position={'bottom-right'} pauseOnFocusLoss={false} autoClose={3000}/>
        </body>
        </html>
    );
}