import React from "react";
import PropTypes from "prop-types";
import {
  Tab,
  Tabs,
  Typography,
  Box,
  makeStyles,
  AppBar,
  CssBaseline
} from "@material-ui/core";

//import FormBuilder from "./PaperContainer";
import DnDtest from "../test";

//===============

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "transparent"
  },
  form: {
    boxShadow: 1,
    "&:hover": {
      boxShadow: 3
    }
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Tasks" {...a11yProps(0)} />
          <Tab label="Responses" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <DnDtest />
      </TabPanel>
      <TabPanel value={value} index={1} />
    </div>
  );
}
/**
 * <TabPanel value={value} index={0}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {columns.map((column, i) => {
            return (
              <div key={i}>
                <Typography key={column.id}>{column.title}</Typography>
                <DnDtest
                  tasks={column.tasks}
                  total={i}
                  ID={column.id}
                  key={column.id}
                />
              </div>
            );
          })}
        </DragDropContext>
      </TabPanel>
      <TabPanel value={value} index={1} />
 */
