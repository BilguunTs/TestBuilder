import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
//import QuestionField from "./components/Input";
import ShiftFieldType from "./ShiftField";

export default function FormHeader(props) {
  const { question } = props;
  /*function getI() {
    for (let i = 0; i <= props.context.state.items.length; i++) {
      if (props.context.state.items[i].Question === question) {
        return i;
      }
    }
  }*/
  return (
    <Grid container justify="space-between">
      <Grid item>
        <TextField value="This is demo" autoFocus label="Question" />
      </Grid>
      <Grid item>
        <ShiftFieldType {...props} On={null} />
      </Grid>
    </Grid>
  );
}
//setup before functions
//time in ms, 5 second for example

//on keyup, start the countdown
/**
 *  <QuestionField
          {...props}
          intype="ask"
          defaultValue={question}
          inputProps={{
            "aria-label": "description"
          }}
        />
 */
//user is "finished typing," do something
