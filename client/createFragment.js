import React from "react";
import { hydrate, render } from "react-dom";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./ErrorBoundary";
import { fragmentContext } from "./context";

export function createFragment(RootComponent) {
  const Fragment = ({ rootComponentProps }) => {
    return (
      <ErrorBoundary>
        <fragmentContext.Provider value={{ ...rootComponentProps }}>
          <RootComponent {...rootComponentProps} />
        </fragmentContext.Provider>
      </ErrorBoundary>
    );
  };

  async function renderFunction(
    rootElement,
    { baseUrl = "/", locale, rootComponentProps, sentry, tenant },
  ) {
    if (!rootElement) return;

    createRoot(rootElement).render(Fragment);
  }

  // this will be called at initialization for making the JS interactive irrelevant for the bug
  async function init(rootElement) {
    const fragmentData = window?.custom?.data?.fragment;

    const { rootComponentProps } = fragmentData;

    if (!rootElement) {
      throw new Error(
        `Could not initialize Fragment because no valid container element was given. Got: ${rootElement}`,
      );
    }

    const fragment = <Fragment rootComponentProps={rootComponentProps} />;

    hydrate(fragment, rootElement);
  }

  return { Fragment, init, render: renderFunction };
}
