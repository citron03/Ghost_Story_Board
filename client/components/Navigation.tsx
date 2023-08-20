import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import styles from "./Navigation.module.css";
import GhostLottie from "./LottieGhost";

export default function Navigation() {
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#ffffff"
      >
        <Heading className={styles.title}>괴담 괴시판</Heading>
        <GhostLottie />
      </Box>
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
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/settings">
            Settings
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
}
