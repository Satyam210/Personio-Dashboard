import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      errorInfo,
    });

    // rollbar.error('Error with Dashboard Page', {
    // 	error,
    // 	errorInfo,
    // });
    // You can also log error messages to an error reporting service here
  }

  render() {
    // Normally, just render children
    if (this.state.errorInfo) {
      <div>Something Went Wrong</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.any,
};
