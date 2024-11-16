import React from "react";
import { hydrateRoot } from "react-dom/client";
import { ErrorBoundary } from "./ErrorBoundary";
import { fragmentContext } from "./context";
import { IntlProvider } from "react-intl";

export function createFragment(RootComponent) {
  const Fragment = ({ rootComponentProps }) => {
    return (
      <ErrorBoundary>
        <IntlProvider locale={"de"} defaultLocale="de">
          <fragmentContext.Provider value={{ ...rootComponentProps }}>
            <RootComponent {...rootComponentProps} />
          </fragmentContext.Provider>
        </IntlProvider>
      </ErrorBoundary>
    );
  };

  async function init(rootElement) {
    const { rootComponentProps } = window?.custom?.data;

    if (!rootElement) {
      throw new Error(
        `Could not initialize Fragment because no valid container element was given. Got: ${rootElement}`,
      );
    }

    hydrateRoot(
      rootElement,
      <Fragment rootComponentProps={rootComponentProps} />,
    );
  }

  return { Fragment, init };
}
