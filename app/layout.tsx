
import {Providers} from "./providers";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "哔哩播放器",
    description: "B站视频音频播放",
};
export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
      <html lang="en" className='light m-4'>
      {/*b站图片显示meta*/}
      <meta name="referrer" content="no-referrer"/>
      <body className={inter.className}>
      <Providers>
        {children}
      </Providers>
      </body>
      </html>
  );
}