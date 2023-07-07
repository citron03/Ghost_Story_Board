"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import * as dayjs from "dayjs";
import "dayjs/locale/ko"; // import locale
import Navigation from "@/components/Navigation";
dayjs.locale("ko");

import styles from "./layout.module.css";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "괴담 괴시판 👻",
  description: "유쾌하고 으스스한 괴담을 나누는 장소입니다",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <main className={styles.main}>
              <Navigation />
              {children}
            </main>
          </ChakraProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
