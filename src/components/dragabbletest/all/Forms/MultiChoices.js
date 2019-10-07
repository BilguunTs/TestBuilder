import React, { Fragment } from "react";
import {
  makeStyles,
  Radio,
  RadioGroup,
  ListItem,
  ListItemIcon,
  IconButton,
  FormControlLabel,
  FormControl,
  List,
  Grid,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Input,
  Button,
  Typography
} from "@material-ui/core";

import Clear from "@material-ui/icons/Remove";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { connecter } from "../Context";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%",
    maxWidth: 360
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 3)
  }
}));

function MultiChoices(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("female");
  const { isEditable, id, context } = props;
  const [array, setArray] = React.useState({ lists: [1, 2, 3, 4] });
  function handleChange(event) {
    setValue(event.target.value);
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    /* setArray(({ lists }) => ({
      lists:// arrayMove(lists, oldIndex, newIndex)
    }));*/
  };
  const SortableItem = SortableElement(({ value }) => {
    return (
      <FormControlLabel value={value} control={<Radio />} label="Female" />
    );
  });
  const addAnswer = () => {
    let instance = { id: "", value: "" };
    let _id =
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9);
    /* generates new instance of form
    let New = Object.assign({}, config.defaultAnswer);
    New.formID = _id;*/
    instance.id = _id;
    context.addAnswer(id, instance);
  };
  const renderEditable = () => {
    return (
      <SortableContainer
        onSortEnd={onSortEnd}
        lockAxis="y"
        onSortEnd={onSortEnd}
        useDragHandle
      >
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            className={classes.group}
            value={value}
            onChange={handleChange}
          >
            {array.lists.map((o, i) => {
              return <SortableItem key={i} value={o} index={i} />;
            })}
          </RadioGroup>
        </FormControl>
      </SortableContainer>
    );
  };
  const renderClient = () => {
    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          className={classes.group}
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            inputRef={props.context.myRef}
            value="female"
            control={<Radio />}
            label="Female"
          />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
          />
        </RadioGroup>
      </FormControl>
    );
  };

  const [checked, setChecked] = React.useState([0]);
  const InRef = React.useRef();
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  let index;

  context.state.answers.find((o, i) => {
    if (o.formID == id) {
      return (index = i);
    }
  });

  return (
    <Fragment>
      <List className={classes.root}>
        {
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="stretch"
          >
            {context.state.answers[index].values.map((o, i) => {
              const labelId = `checkbox-list-label-${o.id}`;

              return (
                <Grid key={labelId} item xs>
                  <ListItem key={o.id} role={undefined} dense button={false}>
                    <ListItemIcon>
                      <Radio
                        //checked={checked.indexOf(o.value) !== -1}
                        disabled={props.default === true}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId}>
                      {props.default === true ? (
                        <Typography>
                          {context.state.answers[index].values[i].value}
                        </Typography>
                      ) : (
                        <TextField
                          autoFocus
                          onChange={e =>
                            (context.state.answers[index].values[i].value =
                              e.target.value)
                          }
                          defaultValue={
                            context.state.answers[index].values[i].value
                          }
                        />
                      )}
                    </ListItemText>
                    {props.default === true ? null : (
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={context.deleteAnswer.bind(this, id, o.id)}
                          edge="end"
                          aria-label="comments"
                        >
                          <Clear />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                </Grid>
              );
            })}
            {props.default === true ? null : (
              <Button onClick={addAnswer.bind(this)}>
                <AddIcon />
              </Button>
            )}
          </Grid>
        }
      </List>
    </Fragment>
  );
}
export default connecter(MultiChoices);
