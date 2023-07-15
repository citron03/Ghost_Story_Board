import { Metadata } from "next";

export const metadata: Metadata = {
  title: "괴담 읽는 중...",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
