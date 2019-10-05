/**
 * ===============================
 *   ****** Test Builder********
 * This app is inspired by google
 * survey and form builder powered
 * by MIT licenses
 *
 * ==============================
 */
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MainView from "./sortablelistdrag/draghandle";
import { ContextWrapper, Contextulize } from "./all/Context";
import Fab from "@material-ui/core/Fab";
//import SideButton from "./card/components/SideButtons";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
class DragTest extends Component {
  render() {
    return (
      <ContextWrapper>
        <Contextulize.Consumer>
          {ct => {
            return (
              <>
                <Grid container justify="center" direction="row">
                  <Grid item lg={6} sm={12} md={8}>
                    <MainView />
                  </Grid>
                </Grid>
                <Fab
                  onClick={ct.addForm.bind(this)}
                  color="secondary"
                  style={{ position: "fixed", right: "20px", bottom: "30px" }}
                >
                  <SpeedDialIcon />
                </Fab>
              </>
            );
          }}
        </Contextulize.Consumer>
      </ContextWrapper>
    );
  }
}

export default DragTest;
/**
 * <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.primary}
                          secondary={item.secondary}
                        />
                        <ListItemSecondaryAction>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
 * 
 * 
 *  <ListItem
                  {...provided.droppableProps}
                  innerRef={provided.innerRef}
                  style={{ border: "1px solid black", padding: "0" }}
                  dense={true}
                  alignItems="center"
                  autoFocus={true}
                  key={index}
                  role={undefined}
                >
                  {<FormField key={index} id={task.id} index={index} />}
                  {provided.placeholder}
                </ListItem>
 */
