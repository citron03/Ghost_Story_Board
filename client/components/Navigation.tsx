import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <div>
      <h1 className={styles.title}>괴담 괴시판 👻</h1>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link href="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href="/post">Write</Link>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
}
