import React, { startTransition } from "react";
import { render } from "react-dom";
import { createRoot, hydrateRoot } from "react-dom/client";

export function createFragment(RootComponent) {
  const Fragment = ({ rootComponentProps }) => {
    return <RootComponent {...rootComponentProps} />;
  };

  async function init(rootElement) {
    if (!rootElement) {
      throw new Error(
        `Could not initialize Fragment because no valid container element was given. Got: ${rootElement}`,
      );
    }

    const fragment = <Fragment rootComponentProps={rootComponentProps} />;

    const hydrateFunction = () => {
      hydrateRoot(rootElement, fragment);
    };

    startTransition(hydrateFunction);
  }

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

  return { Fragment, init, render: renderFunction };
}