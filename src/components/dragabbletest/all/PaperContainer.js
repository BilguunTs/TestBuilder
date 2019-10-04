import React, {
  forwardRef,
  createContext,
  useRef,
  useState,
  useEffect
} from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import DragIcon from "@material-ui/icons/DragIndicatorTwoTone";
import { Grid, Input, List, ListItem, RootRef } from "@material-ui/core";
import Header from "./FormHeader";
import Footer from "./Formfooter";
import Body from "./FormBody";
import { SortableHandle } from "react-sortable-hoc";
import "../sortablelistdrag/Helper.css";

import { logProps } from "./ForwardHOC";

/*const useStyles = theme =>
  createStyles({
    root: {
      padding: theme.spacing(1, 5),

      borderLeft: "3px solid #fff",

      /* For Safari 3.1 to 6.0 */

/* "&:active": {
      margin: "1px",

      transition: "margin 0.2s"
    },*/
/*    "&:hover #dragIcon": {
        visibility: "visible"
      }
    },

    button: {
      display: "block",
      marginTop: theme.spacing(2)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    input: {
      margin: theme.spacing(1)
    },
    List: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    }
  });*/
const styles = {
  root: {
    //borderLeft: "3px solid #fff",
    margin: "20px",
    paddingRight: "20px",
    paddingLeft: "20px",
    "&:active": {
      borderLeft: "3px solid blue"
    },
    "&:hover #dragIcon": {
      visibility: "visible"
    },
    "&:focus ": {
      backgroundColor: "red"
    },
    "&:target": {
      backgroundColor: "red"
    }
  }
};
const DragHandle = SortableHandle(() => (
  <span className="DragHandler">
    <DragIcon id="dragIcon" focusable={true} />
  </span>
));
class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
    this.mainref = React.createRef();
    this.state = {
      mark: this.props.context.state.targetis == this.props.index
    };
  }

  onMouseOver = e => {
    console.log("I am current:" + this.props.context.state.targetis);
    this.setState({ elv: 15 });
  };
  onMouseOut = () => {
    this.setState({ elv: 1 });
  };

  onMouseClick = e => {
    console.log("I am targeted :" + this.mainref.current.id);

    // this.props.context.setIsFocused(this.mainref.current.id);
  };
  render() {
    const { classes, isFocused, ...rest } = this.props;
    const { mark } = this.state;
    // const classes = useStyles();
    return (
      <RootRef rootRef={this.rootRef}>
        <Paper
          {...rest}
          id={this.props.id}
          ref={this.mainref}
          onMouseOut={this.onMouseOut.bind(this)}
          onMouseOver={e => this.onMouseOver(e)}
          className={classes.root}
          square={false}
          elevation={2}
          style={
            {
              /* zIndex: `${mark ? 10 : -1}`,
            opacity: `${mark ? 1 : 0.6}`,
            padding: `${mark ? "20px" : "10px"}`,*/
              /*   borderLeft: `3px solid ${
              this.props.selectedIndex === this.props.index ? "blue" : "#fff"
            }`*/
            }
          }
        >
          <Grid container justify="center" spacing={3}>
            <Grid item>
              <DragHandle />
            </Grid>
          </Grid>

          <Header {...rest} />
          <Grid container>
            <Grid item>
              <Body {...rest} />
            </Grid>
          </Grid>
          <Divider />
          <Footer {...rest} />
        </Paper>
      </RootRef>
    );
  }
}

export default withStyles(styles)(MainForm);
/**
 * <Droppable droppableId={props.ID}>
        {provided => (
          <List className={classes.List} {...provided.droppableProps}>
            {props.tasks.map(task => {
              return (
                <Paper
                  key={task.id}
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                  className={classes.root}
                  elevation={value}
                >
                  <Grid container justify="center" spacing={3}>
                    <Grid item>
                      <DragIcon style={{ transform: "rotate(90deg)" }} />
                    </Grid>
                  </Grid>

                  <Grid container justify="space-between">
                    <Grid item>
                      <Input
                        defaultValue={props.defValue}
                        className={classes.input}
                        inputProps={{
                          "aria-label": "description"
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <ShiftFieldType />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item>
                      <Body />
                    </Grid>
                  </Grid>
                  <Divider />
                  <Footer />
                </Paper>
              );
            })}
          </List>
        )}
      </Droppable>
 */
