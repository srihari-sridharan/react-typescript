import React, { useEffect, useState } from "react";

function ClickCounter() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("Online");


  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });


  return (
    <div>
      <span>You clicked {count} times. Status: {status}.</span> <br />
      <button
        style={{ margin: "5px", marginBottom: "25px" }}
        onClick={() => {
          setCount(count + 1);
          const newStatus = ((count + 1) % 2 === 0)?"Online":"Offline";
          setStatus(newStatus);
        }}
      >
        Click me
      </button>
    </div>
  );
}

export default ClickCounter;
