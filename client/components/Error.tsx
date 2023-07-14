import { Box } from "@chakra-ui/react";
import { FallbackProps } from "react-error-boundary";

export default function Error({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Box>
      <h1>ERROR!</h1>
      <p> 에러: {error.message} </p>
      <button onClick={() => resetErrorBoundary()}> 다시 시도 </button>
    </Box>
  );
}
