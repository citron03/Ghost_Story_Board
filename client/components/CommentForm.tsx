import { useCallback, useReducer } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "@/utils/api";

interface ReducerState {
  content: string;
  writer: string;
  password: string;
}

type ReducerType =
  | "SET_CONTENT"
  | "SET_WRITER"
  | "SET_PASSWORD"
  | "RESET_COMMENT_FORM";

interface ReducerAction {
  type: ReducerType;
  payload?: string;
}

const initialState = {
  content: "",
  writer: "",
  password: "",
};

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  switch (action.type) {
    case "SET_CONTENT": {
      if (typeof action.payload === "string") {
        return { ...state, content: action.payload };
      } else {
        return state;
      }
    }
    case "SET_WRITER": {
      if (typeof action.payload === "string") {
        return { ...state, writer: action.payload };
      } else {
        return state;
      }
    }
    case "SET_PASSWORD": {
      if (typeof action.payload === "string") {
        return { ...state, password: action.payload };
      } else {
        return state;
      }
    }
    case "RESET_COMMENT_FORM": {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export default function CommentForm({ postId }: { postId: string }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isContentInvalid = state.content.length <= 0;
  const isWriterInvalid = state.writer.length <= 0;
  const isPasswordInvalid = state.password.length <= 0;
  const isInvalidForm =
    isContentInvalid || isWriterInvalid || isPasswordInvalid;
  const submitComment = useCallback(async () => {
    try {
      const result = await axios.post("/board/comment", {
        postId,
        content: state.content,
        writer: state.writer,
        password: state.password,
      });
      if (result) {
        alert("댓글 작성 성공!");
        dispatch({ type: "RESET_COMMENT_FORM" });
      } else {
        throw new Error("서버로부터 응답 없음");
      }
    } catch (err) {
      alert("댓글 작성 실패!");
    }
  }, [postId, state.content, state.password, state.writer]);
  return (
    <Box margin="2.5">
      <FormControl>
        <Textarea
          placeholder="댓글을 작성합니다"
          value={state.content}
          onChange={(event) => {
            dispatch({ type: "SET_CONTENT", payload: event.target.value });
          }}
        />
        <Box display="flex" flexDirection="row">
          <Input
            placeholder="작성자"
            value={state.writer}
            onChange={(event) => {
              dispatch({ type: "SET_WRITER", payload: event.target.value });
            }}
          />
          <Input
            placeholder="password"
            value={state.password}
            onChange={(event) => {
              dispatch({ type: "SET_PASSWORD", payload: event.target.value });
            }}
          />
        </Box>
        {isInvalidForm && (
          <FormHelperText color="red">
            입력하지 않은 값이 있습니다.
          </FormHelperText>
        )}
      </FormControl>
      <ButtonGroup isDisabled={isInvalidForm}>
        <Button onClick={submitComment}>댓글 작성</Button>
      </ButtonGroup>
    </Box>
  );
}
