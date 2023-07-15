import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <Box>
      <Heading className={styles.title}>괴담 괴시판 👻</Heading>
      <Breadcrumb
        separator="/"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="gray.100"
        padding="2"
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/post">
            Write
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
}
