import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <h2>Something went wrong while rendering.</h2>;
    return this.props.children;
  }
}

export default ErrorBoundary;
