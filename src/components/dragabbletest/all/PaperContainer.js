import React, {
  forwardRef,
  createContext,
  useRef,
  useState,
  useEffect
} from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import DragIcon from "@material-ui/icons/DragIndicatorTwoTone";
import { Grid, Input, List, ListItem, RootRef } from "@material-ui/core";
import Header from "./FormHeader";
import Footer from "./Formfooter";
import Body from "./FormBody";
import { SortableHandle } from "react-sortable-hoc";
import "../sortablelistdrag/Helper.css";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

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
    margin: "0px",
    paddingRight: "20px",
    paddingLeft: "20px",

    "&:active": {
      borderLeft: "3px solid blue",
      opacity: "1"
    },

    "&:hover": {
      opacity: "1",
      borderLeft: "3px solid dark"
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
  <Grid
    style={{ cursor: "move", "&:active": { cursor: "move" } }}
    container
    justify="center"
    spacing={1}
  >
    <Grid item>
      <span className="DragHandler">
        <DragIcon id="dragIcon" focusable={true} />
      </span>
    </Grid>
  </Grid>
));
class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
    this.mainref = React.createRef();
    this.state = {
      mark: false,
      current: "Ref1"
    };
  }
  componentDidMount() {
    if (this.props.context.state.targetis === this.props.id) {
      this.setState({ mark: true });
    }
  }
  componentWillUnmount() {
    this.props.context.setIsFocused.bind(this, this.mainref.current.id);
  }

  handleClickAway = () => {
    this.setState({ mark: false });
  };
  onMouseClick = e => {
    if (
      this.props.context.state.targetis === this.mainref.current.id &&
      this.state.mark === true
    ) {
      return;
    }

    this.props.context.setIsFocused(this.mainref.current.id);

    this.setState({ mark: true });
  };
  render() {
    const { classes, isFocused, ...rest } = this.props;
    const { mark } = this.state;

    // const classes = useStyles();
    //   console.log(this.props.index);
    return (
      <RootRef rootRef={this.rootRef}>
        {mark ? (
          <ClickAwayListener onClickAway={this.handleClickAway}>
            <div>
              <Paper
                {...rest}
                id={this.props.id}
                ref={this.mainref}
                className={classes.root}
                square={false}
                onClick={this.onMouseClick.bind(this)}
                elevation={mark ? 20 : 2}
                style={{
                  //     zIndex: `${mark ? 10 : 1}`,
                  // padding: `${mark ? "2px" : "1px"}`,
                  backgroundColor: "#fff",

                  borderLeft: `3px solid  #4d90fe `
                }}
              >
                <div
                  style={{ padding: "1px" }}
                  onClick={this.onMouseClick.bind(this)}
                >
                  <DragHandle />
                </div>

                <Header {...rest} />
                <Grid container>
                  <Grid item>
                    <Body {...rest} />
                  </Grid>
                </Grid>
                <Divider />
                <Footer {...rest} />
              </Paper>
            </div>
          </ClickAwayListener>
        ) : (
          <ClickAwayListener
            touchEvent="onTouchEnd"
            mouseEvent="onMouseDown"
            onClickAway={this.handleClickAway}
          >
            <div
              style={{ backgroundColor: "# f5f5f5" }}
              className={classes.root}
              ref={this.mainref}
              id={this.props.id}
              onClick={this.onMouseClick.bind(this)}
            >
              <div
                style={{ padding: "1px" }}
                onMouseDown={this.onMouseClick.bind(this)}
              >
                <DragHandle />
              </div>

              <Grid container direction="column">
                <Grid item>
                  <Header default={true} {...rest} />
                </Grid>
                <Grid item>
                  <Body default={true} {...rest} />
                </Grid>
                <Grid item></Grid>
              </Grid>
            </div>
          </ClickAwayListener>
        )}
      </RootRef>
    );
  }
}

export default withStyles(styles)(MainForm);
