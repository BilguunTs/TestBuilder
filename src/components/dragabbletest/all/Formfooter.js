import React from "react";
import Switch from "@material-ui/core/Switch";
import { IconButton, Typography, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DuplicateIcon from "@material-ui/icons/FileCopy";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
export default function Switches(props) {
  const { id, context, isrequired } = props;
  const [state, setState] = React.useState({
    checkedA: isrequired ? true : false,
    checkedB: true
  });

  const handleChange = name => event => {
    context.toggleIsRequired(event.target.checked, id);
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div>
      <Grid container direction="row" justify="flex-end" alignItems="baseline">
        <Grid>
          <IconButton aria-label="duplicate">
            <DuplicateIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={context.deleteForm.bind(this, id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Grid>

        <Divider variant="middle" />

        <Grid item>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange("checkedA")}
                  value="checkedB"
                />
              }
              label={isrequired ? "required" : "unrequired"}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );
}
