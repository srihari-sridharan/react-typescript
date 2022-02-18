import React, { useState } from "react";

function ClickCounter() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>You clicked {count} times</span> <br />
      <button
        style={{ margin: "5px", marginBottom: "25px" }}
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
    </div>
  );
}

export default ClickCounter;
