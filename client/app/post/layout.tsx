import { Metadata } from "next";

export const metadata: Metadata = {
  title: "괴담 작성중 ...",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
