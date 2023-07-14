import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { FallbackProps } from "react-error-boundary";

export default function Error({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading marginBottom="2.5">ERROR!</Heading>
      <Box display="flex" flexDirection="row" alignItems="center">
        <WarningIcon w={8} h={8} color="red.500" margin="2" />
        <Text fontSize="lg"> 에러: {error.message} </Text>
      </Box>
      <Button colorScheme="red" onClick={() => resetErrorBoundary()}>
        다시 시도
      </Button>
    </Box>
  );
}
