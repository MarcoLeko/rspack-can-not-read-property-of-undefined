import React from "react";
import styles from "./app.module.css";
import { FormattedMessage, useIntl } from "react-intl";

const BoldComponent = (chunks) => <b>{chunks}</b>;

function App(props) {
  const intl = useIntl();
  const [number, setNumber] = React.useState(7);

  return (
    <div className={styles.bgGray}>
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
        <FormattedMessage
          defaultMessage={
            "<b>Some text with rich-text element in bold.</b> Non bold text"
          }
          values={{ b: BoldComponent }}
        />
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
