import React from "react";
import styles from "./app.scss";

console.log(styles);

function App(props) {
  const [number, setNumber] = React.useState(7);

  return (
    <div className={styles.bgPurple}>
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
