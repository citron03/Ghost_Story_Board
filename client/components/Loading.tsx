import { Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.700"
      color="red.500"
      size="xl"
    />
  );
}
