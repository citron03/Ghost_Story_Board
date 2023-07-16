"use client";
import { useCallback, useReducer } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
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
  | "CHANGE_TAGS"
  | "RESET_POST_FORM";

interface Action {
  type: ReducerType;
  payload?: string | string[];
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
    case "RESET_POST_FORM": {
      return { ...initialState };
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
      dispatch({ type: "RESET_POST_FORM" });
      console.log("res", res);
    } catch (error) {
      window.alert("에러 발생!");
      console.error(error);
    }
  }, [state]);
  const isTitleInvalid = state.title.length <= 0;
  const isWriterInvalid = state.writer.length <= 0;
  const isPasswordInvValid = state.password.length <= 3;
  const isContentInvalid = state.content.length <= 4;
  return (
    <Box className={styles.container}>
      <FormControl className={styles.formControl} isInvalid={isTitleInvalid}>
        <FormLabel>제목</FormLabel>
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
        {isTitleInvalid && (
          <FormHelperText color="red">
            괴담 제목을 작성해 주세요.
          </FormHelperText>
        )}
      </FormControl>
      <FormControl className={styles.formControl} isInvalid={isWriterInvalid}>
        <FormLabel>작성자</FormLabel>
        <Input
          placeholder="작성자의 이름"
          size="sm"
          value={state.writer}
          onChange={(event) =>
            dispatch({ type: "CHANGE_WRITER", payload: event.target.value })
          }
        />
        {isWriterInvalid && (
          <FormHelperText color="red">
            글 작성자 이름을 작성해주세요.
          </FormHelperText>
        )}
      </FormControl>
      <FormControl
        className={styles.formControl}
        isInvalid={isPasswordInvValid}
      >
        <FormLabel>글 비밀번호</FormLabel>
        <Input
          placeholder="게시물 비밀번호"
          size="sm"
          value={state.password}
          onChange={(event) =>
            dispatch({ type: "CHANGE_PASSWORD", payload: event.target.value })
          }
        />
        {isPasswordInvValid && (
          <FormHelperText color="red">
            4자리 이상의 비밀번호를 입력하세요.
          </FormHelperText>
        )}
      </FormControl>
      <FormControl className={styles.formControl} isInvalid={isContentInvalid}>
        <FormLabel>괴담 내용</FormLabel>
        <Textarea
          value={state.content}
          onChange={(event) =>
            dispatch({ type: "CHANGE_CONTENT", payload: event.target.value })
          }
          placeholder="당신의 괴담을 적어주세요 👻"
          size="md"
        />
        {isContentInvalid && (
          <FormHelperText color="red">
            최소 5자 이상의 내용을 작성해주세요.
          </FormHelperText>
        )}
      </FormControl>
      <Input
        placeholder="태그 작성"
        size="sm"
        value={state.tags?.join(" ")}
        onChange={(event) =>
          dispatch({
            type: "CHANGE_TAGS",
            payload: event.target.value.split(" "),
          })
        }
      />
      <ButtonGroup
        className={styles.buttonGroup}
        isDisabled={
          isTitleInvalid ||
          isWriterInvalid ||
          isPasswordInvValid ||
          isContentInvalid
        }
      >
        <Button colorScheme="teal" variant="outline" onClick={onClickPost}>
          등록!
        </Button>
      </ButtonGroup>
    </Box>
  );
}
