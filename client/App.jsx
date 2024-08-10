import React from "react";

function App() {
  const [number, setNumber] = React.useState(7);
  return (
    <div>
      <header>
        <p>
          Hey ho <code>welcome</code> to my reproducible bug.
        </p>
        <button onClick={() => setNumber(number + 1)}>Increment number</button>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn My lucky number {number}
        </a>
      </header>
    </div>
  );
}

export { App };
