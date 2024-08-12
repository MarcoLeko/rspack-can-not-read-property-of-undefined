import React from "react";
import { hydrate, render } from "react-dom";
import { createRoot } from "react-dom/client";

export function createFragment(RootComponent) {
  const Fragment = ({ rootComponentProps }) => {
    return <RootComponent {...rootComponentProps} />;
  };

  async function renderFunction(
    rootElement,
    { baseUrl = "/", locale, rootComponentProps, sentry, tenant },
  ) {
    if (!rootElement) return;

    const fragment = (
      <Fragment
        baseUrl={baseUrl}
        tenant={tenant}
        locale={locale}
        rootComponentProps={rootComponentProps}
        sentry={sentry}
      />
    );

    createRoot(rootElement).render(fragment);
  }

  // this will be called at initialization for making the JS interactive irrelevant for the bug
  async function init(rootElement) {
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
