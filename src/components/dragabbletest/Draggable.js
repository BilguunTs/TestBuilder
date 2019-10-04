import React, { Component } from "react";
import Container from "./all/Container";

class SortableComponent extends Component {
  //<SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  render() {
    return (
      <div>
        <Container />
      </div>
    );
  }
}

export default SortableComponent;
