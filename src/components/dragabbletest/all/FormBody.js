import React, { Component } from "react";

import { Grid, Input } from "@material-ui/core";
import { AllTypes } from "./FormType";
import {
  CheckBoxes,
  Date,
  DropDown,
  FileLoad,
  LinearScale,
  MultiChoiceGrid,
  TickBoxGrid,
  Time
} from "./Forms";
import Paragraph from "./Forms/Paragraph";
import ShortAnswer from "./Forms/ShortAnswer";
import MultiChoices from "./Forms/MultiChoices";
class FormBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const RenderField = () => {
      let Instance;
      switch (this.props.type) {
        case AllTypes.CheckBoxes:
          return (Instance = <CheckBoxes />);
        case AllTypes.Date:
          return (Instance = <Date />);
        case AllTypes.DropDown:
          return (Instance = <DropDown />);
        case AllTypes.FileLoad:
          return (Instance = <FileLoad />);
        case AllTypes.LinearScale:
          return (Instance = <LinearScale />);
        case AllTypes.MultiChoiceGrid:
          return (Instance = <MultiChoiceGrid />);
        case AllTypes.MultiChoices:
          return (Instance = <MultiChoices id={this.props.id} />);
        case AllTypes.Paragraph:
          return (Instance = <Paragraph />);
        case AllTypes.ShortAnswer:
          return (Instance = <ShortAnswer />);
        case AllTypes.TickBoxGrid:
          return (Instance = <TickBoxGrid />);
        case AllTypes.Time:
          return (Instance = <Time />);
        default:
          return (Instance = <h1>null</h1>);
      }
    };
    const { context, type } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ backgroundColor: "#eee" }}
      >
        <Grid item xs>
          {RenderField()}
        </Grid>
      </Grid>
    );
  }
}
export default FormBody;
