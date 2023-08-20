"use client";
import { Button, Stack, Text } from "@chakra-ui/react";
import axios from "@/utils/api";

export default function Settings() {
  return (
    <Stack>
      <Text>Settings</Text>
      <Button
        onClick={() => {
          console.log("send email");
          axios.get("/utils/test-email").then(console.log).catch(console.error);
        }}
      >
        Email Test
      </Button>
    </Stack>
  );
}
