"use client";
import "./globals.css";

import { Inter } from "next/font/google";
import { Metadata } from "next";

import styles from "./layout.module.css";
import Navigation from "@/components/Navigation";
import Providers from "@/components/Providers";

import * as dayjs from "dayjs";
import "dayjs/locale/ko"; // import locale
dayjs.locale("ko");

const inter = Inter({ subsets: ["latin"] });

// "use clinet"에서 사용 불가능
// export const metadata: Metadata = {
//   title: "괴담 괴시판 👻",
//   description: "유쾌하고 으스스한 괴담을 나누는 장소입니다",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <title>괴담 괴시판 👻</title>
        <meta
          name="description"
          content="유쾌하고 으스스한 괴담을 나누는 장소입니다"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="괴담을 공유하고 괴담을 읽을 수 있는 플랫폼"
        />
        <meta
          property="og:url"
          content="https://ghost-story-board.vercel.app/"
        />
        <meta property="og:locale" content="ko_KR" />
        <meta
          property="og:url"
          content="https://ghost-story-board.vercel.app/assets/ghosts-cute.png" // TODO: 권장 크기: 1200 x 630
        />
      </head>
      <body className={inter.className}>
        <main className={styles.main}>
          <Providers>
            <Navigation />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
