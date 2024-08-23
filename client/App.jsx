import React, { useEffect } from "react";

function App(props) {
  const [number, setNumber] = React.useState(7);

  useEffect(() => {
    setNumber(number + 1);
  }, []);

  return (
    <div>
      <header>
        <p>
          Hey ho <code>welcome</code> to JSMDs blueprint setup. These are my
          passed props {JSON.stringify(props)}
        </p>
        <button
          onClick={() => {
            setNumber(number + 1);
          }}
        >
          Increment number
        </button>
        <br />
        <br />
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Bump your lucky number {number}
        </a>
      </header>
    </div>
  );
}

export { App };
