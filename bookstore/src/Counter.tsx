import * as React from "react";

const initialState = { vote: 0 };

type ACTIONTYPE =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "increment":
      return { vote: state.vote + action.payload };
    case "decrement":
      return { vote: state.vote - Number(action.payload) };
    default:
      throw new Error();
  }
}

function Voter() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <>
      <button onClick={() => dispatch({ type: "increment", payload: 1 })}>
        Up Vote
      </button>
      Votes: {state.vote}
      <button
        style={{ margin: "5px" }}
        onClick={() => dispatch({ type: "decrement", payload: "1" })}
      >
        Down Vote
      </button>
    </>
  );
}

export default Voter;
