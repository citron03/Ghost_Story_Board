"use client";
import { useCallback, useReducer } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import styles from "./PostForm.module.css";
import axios from "../utils/api";

interface Post {
  title: string;
  content: string;
  writer: string;
  password: string;
  tags?: string[];
}

type ReducerType =
  | "CHANGE_TITLE"
  | "CHANGE_CONTENT"
  | "CHANGE_WRITER"
  | "CHANGE_PASSWORD"
  | "CHANGE_TAGS";

interface Action {
  type: ReducerType;
  payload: string | string[];
}

const initialState: Post = {
  title: "",
  content: "",
  writer: "",
  password: "",
  tags: [],
};

const reducer = (state: Post, action: Action): Post => {
  // TODO: 추가적인 유효성 검사 (yup)
  switch (action.type) {
    case "CHANGE_TITLE": {
      if (typeof action.payload === "string") {
        return { ...state, title: action.payload };
      } else {
        return state;
      }
    }
    case "CHANGE_CONTENT": {
      if (typeof action.payload === "string") {
        return { ...state, content: action.payload };
      } else {
        return state;
      }
    }
    case "CHANGE_WRITER": {
      if (typeof action.payload === "string") {
        return { ...state, writer: action.payload };
      } else {
        return state;
      }
    }
    case "CHANGE_PASSWORD": {
      if (typeof action.payload === "string") {
        return { ...state, password: action.payload };
      } else {
        return state;
      }
    }
    case "CHANGE_TAGS": {
      if (
        Array.isArray(action.payload) &&
        action.payload.every((tag) => typeof tag === "string")
      ) {
        return { ...state, tags: action.payload };
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
};

export default function PostForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onClickPost = useCallback(async () => {
    try {
      const res = await axios.post("/board/post", state);
      window.alert("게시물이 등록되었습니다!");
      console.log("res", res);
    } catch (error) {
      window.alert("에러 발생!");
      console.error(error);
    }
  }, [state]);
  return (
    <Box className={styles.container}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <EditIcon color="gray.700" />
        </InputLeftElement>
        <Input
          placeholder="괴담의 제목을 작성하세요."
          size="md"
          value={state.title}
          onChange={(event) =>
            dispatch({ type: "CHANGE_TITLE", payload: event.target.value })
          }
        />
      </InputGroup>
      <Input
        placeholder="작성자의 이름"
        size="sm"
        value={state.writer}
        onChange={(event) =>
          dispatch({ type: "CHANGE_WRITER", payload: event.target.value })
        }
      />
      <Input
        placeholder="게시물 비밀번호"
        size="sm"
        value={state.password}
        onChange={(event) =>
          dispatch({ type: "CHANGE_PASSWORD", payload: event.target.value })
        }
      />
      <Textarea
        value={state.content}
        onChange={(event) =>
          dispatch({ type: "CHANGE_CONTENT", payload: event.target.value })
        }
        placeholder="당신의 괴담을 적어주세요 👻"
        size="md"
      />
      <Input
        placeholder="태그 작성"
        size="sm"
        value={state.tags}
        onChange={(event) =>
          dispatch({
            type: "CHANGE_TAGS",
            payload: event.target.value.split(" "),
          })
        }
      />
      <ButtonGroup className={styles.buttonGroup}>
        <Button colorScheme="teal" variant="outline" onClick={onClickPost}>
          등록!
        </Button>
      </ButtonGroup>
    </Box>
  );
}
