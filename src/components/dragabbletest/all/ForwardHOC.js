import React, { forwardRef } from "react";
export function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      //console.log("old props:", prevProps);
      //console.log("new props:", this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;
      //console.log(forwardedRef);
      // Assign the custom prop "forwardedRef" as a ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // Note the second param "ref" provided by React.forwardRef.
  // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
  // And it can then be attached to the Component.
  return forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
