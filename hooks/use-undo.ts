import { useCallback, useReducer } from "react";

interface IState {
  past: number[];
  present: number;
  future: number[];
}
type IAction =
  | { type: "UNDO" }
  | { type: "REDO" }
  | {
      type: "SET";
      payload: number;
    }
  | {
      type: "RESET";
      payload: number;
    };

export const useUndo = (initial: number) => {
  const [state, dispatch] = useReducer(reducer, {
    past: [],
    present: initial,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    dispatch({ type: "UNDO" });
  }, []);
  const redo = useCallback(() => {
    dispatch({ type: "REDO" });
  }, []);

  const set = useCallback((payload: number) => {
    dispatch({ type: "SET", payload });
  }, []);
  const reset = useCallback((payload: number) => {
    dispatch({ type: "RESET", payload });
  }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }];
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case "UNDO":
      if (state.past.length === 0) return state;

      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future],
      };

    case "REDO":
      if (state.future.length === 0) return state;

      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture,
      };

    case "SET": {
      if (action.payload === state.present) return state;

      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: [],
      };
    }

    case "RESET": {
      return {
        past: [],
        present: action.payload,
        future: [],
      };
    }

    default:
      // @ts-expect-error
      throw new Error(`Unhandled action type ${action.type}`);
  }
};
