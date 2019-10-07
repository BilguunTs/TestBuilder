import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    margin: theme.spacing(1)
  }
}));

export default function ShortAnswer(props) {
  const classes = useStyles();
  const { isEditable } = props;
  return (
    <div className={classes.container}>
      {props.default ? (
        <Typography>Answer goes here</Typography>
      ) : (
        <Input
          placeholder="short answer text"
          className={classes.input}
          inputProps={{
            "aria-label": "description"
          }}
        />
      )}
    </div>
  );
}
