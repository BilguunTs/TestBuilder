import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
//import QuestionField from "./components/Input";
import ShiftFieldType from "./ShiftField";
import Typography from "@material-ui/core/Typography";

export default function FormHeader(props) {
  const qRef = React.useRef();
  return (
    <Grid
      container
      onClick={() => qRef.current.focus()}
      justify="space-between"
    >
      <Grid item>
        {props.default === true ? (
          <Typography variant="h6" ref={qRef}>
            {props.context.state.items[props.index].Question}
          </Typography>
        ) : (
          <TextField
            autoFocus
            inputRef={qRef}
            onChange={e =>
              (props.context.state.items[props.index].Question = e.target.value)
            }
            defaultValue={props.context.state.items[props.index].Question}
            label="Question"
          />
        )}
      </Grid>
      <Grid item>
        {props.default !== true ? (
          <ShiftFieldType {...props} On={null} />
        ) : null}
      </Grid>
    </Grid>
  );
}
