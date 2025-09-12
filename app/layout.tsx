import type { Metadata } from "next";
import localFont from "next/font/local"
import "./globals.css";

const workSans = localFont({
  src: [
    // path → the file path to your font (e.g. ./fonts/WorkSans-Black.ttf).

    // weight → tells CSS what font-weight this file represents (900 = very bold/black).

    // style → tells CSS what font-style this file represents (normal vs italic).

    // “This file (WorkSans-Black.ttf) is the normal style of my font at weight 900.” we'll do this for the rest of the files as well.
    
    //Now go see the metadata below.
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
})

export const metadata: Metadata = {
  //like this we can send the metadata. now see below in body we are passing workSans.variable as the className
  //now we have learnt how to add our own fonts(our font file is there in app folder.)
  //so now we don't need to depend on external services like google fonts.
  title: "Next Startup",
  description: "Pitch, Vote and Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={workSans.variable}
      >
        {children}
      </body>
    </html>
  );
}
