import React, { Component } from "react";

class ErrorBoundary extends Component {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(properties) {
    super(properties);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <div>Error occurred</div>;
    }

    return children;
  }
}

export { ErrorBoundary };
