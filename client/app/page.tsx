"use client";
import styles from "./page.module.css";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import PostsList from "@/components/PostsList";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function Home() {
  return (
    <div className={styles.contents}>
      <ErrorBoundary FallbackComponent={Error}>
        <Suspense fallback={<Loading />}>
          <PostsList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
