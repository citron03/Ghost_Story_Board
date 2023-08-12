import { InputTypes } from "@/types";
import { ChangeEvent, useCallback, useState } from "react";

export default function useInput<T, H extends InputTypes>(
  initialState: T
): [T, (e: ChangeEvent<H>) => void] {
  const [state, setState] = useState(initialState);
  const onChangeState = useCallback((e: ChangeEvent<H>) => {
    const newState = e.target.value as T;
    setState(newState);
  }, []);
  return [state, onChangeState];
}
