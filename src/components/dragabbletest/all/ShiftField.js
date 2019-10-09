import React, { useEffect } from "react";
import { makeStyles, Select, FormControl, MenuItem } from "@material-ui/core";
import Icon from "@material-ui/icons/Filter";
import { AllTypes } from "./FormType";
import { Contextulize } from "./Context";
const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: " #f5f5f5"
  }
}));

function ControlledOpenSelect(props) {
  const classes = useStyles();
  const { context, type, id } = props;
  const [FormType, setFormType] = React.useState(type);
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    setFormType(event.target.value);
    return context.changeType(event.target.value, id);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <form autoComplete="off">
      <FormControl className={classes.formControl}>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={FormType}
          onChange={handleChange}
        >
          <MenuItem value={AllTypes.ShortAnswer}>
            {AllTypes.ShortAnswer}
          </MenuItem>
          <MenuItem value={AllTypes.Paragraph}>{AllTypes.Paragraph}</MenuItem>
          <MenuItem value={AllTypes.MultiChoices}>
            {AllTypes.MultiChoices}
          </MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}
export default ControlledOpenSelect;
/*(
  <Contextulize.Consumer>
    {context => <ControlledOpenSelect {...context} />}
  </Contextulize.Consumer>
);*/
