import React from "react";
import { Contextulize } from "../Context";
const { Provider: CoolProvider, Consumer: CoolConsumer } = Contextulize;

const connecter = Component =>
  React.forwardRef((props, ref) => (
    <CoolConsumer>
      {cool => <Component {...props} cool={cool} ref={ref} />}
    </CoolConsumer>
  ));

/* const withCool = Component => props => (
  <CoolConsumer>
    {cool => <Component {...props} cool={cool} />}
  </CoolConsumer>
); */

class ChildComponent extends React.Component {
  render() {
    return this.props.cool ? (
      <div>Isn't this cool?</div>
    ) : (
      <div>Not so cool!</div>
    );
  }
}

const CoolChildComponent = connecter(ChildComponent);

export class RootComponent extends React.Component {
  render() {
    return (
      <CoolProvider value={true}>
        <ChildComponent
          ref={c => {
            console.log("Normal child ref", c);
          }}
        />
        <CoolChildComponent
          ref={c => {
            console.log("Cool child ref", c);
          }}
        />
      </CoolProvider>
    );
  }
}
