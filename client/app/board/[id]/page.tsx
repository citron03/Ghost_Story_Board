"use client";
import { useParams } from "next/navigation";
import { Box, Text } from "@chakra-ui/react";

export default function Page() {
  const { id } = useParams();
  return (
    <Box>
      <Text>Hi {id}</Text>
    </Box>
  );
}
