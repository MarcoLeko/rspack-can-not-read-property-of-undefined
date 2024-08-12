import { createContext } from "react";

function createFragmentContext() {
  return createContext({});
}

export const fragmentContext = createFragmentContext();
