import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
//import QuestionField from "./components/Input";
import ShiftFieldType from "./ShiftField";

export default function FormHeader(props) {
  const qRef = React.useRef();
  return (
    <Grid
      container
      onClick={() => qRef.current.focus()}
      justify="space-between"
    >
      <Grid item>
        <TextField
          inputRef={qRef}
          onChange={e =>
            (props.context.state.items[props.index].Question = e.target.value)
          }
          defaultValue={props.context.state.items[props.index].Question}
          label="Question"
        />
      </Grid>
      <Grid item>
        <ShiftFieldType {...props} On={null} />
      </Grid>
    </Grid>
  );
}
