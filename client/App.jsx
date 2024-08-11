import React from "react";

// This code will fail as renderToString is unable to handle any react hooks: useState, useRef etc.  👇🏻
function App(props) {
  const [number, setNumber] = React.useState(7);
  return (
    <div>
      <header>
        <p>
          Hey ho <code>welcome</code> to my reproducible bug. These are my
          passed props {JSON.stringify(props)}
        </p>
        <button onClick={() => setNumber(number + 1)}>Increment number</button>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn My lucky number {number}
        </a>
      </header>
    </div>
  );
}

// Uncomment the code below as renderToString without react-hooks will work 👇🏻

// function App(props) {
//   return (
//     <div>
//       <header>
//         <p>
//           Hey ho <code>welcome</code> to my reproducible bug. These are my
//           passed props {JSON.stringify(props)}
//         </p>
//         <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
//           Learn My lucky number 7
//         </a>
//       </header>
//     </div>
//   );
// }

export { App };
