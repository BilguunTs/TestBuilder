import React, { Component, createRef } from "react";
import FormBuilder from "../all/PaperContainer";
import { sortableContainer, sortableElement } from "react-sortable-hoc";

import "./Helper.css";
import { connecter } from "../all/Context";
const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

class Draghandle extends Component {
  constructor(props) {
    super(props);
    this.focusOnme = createRef();
    this.state = {
      selectedindex: 0,
      mark: null,
      id: ""
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return;
    }
    this.props.context.onArrayMove(oldIndex, newIndex);
  };
  handleListItemClick(e, index) {
    return this.setState({ selectedindex: index });
  }
  render() {
    const SortableItem = sortableElement(
      ({ indexis, ID, formtype, isFocused, isrequired, question, context }) => (
        <FormBuilder
          {...this.state}
          setcurrent={this.handleListItemClick}
          isrequired={isrequired}
          context={context}
          question={question}
          index={indexis}
          id={ID}
          type={formtype}
        />
      )
    );
    const { context } = this.props;
    return (
      <SortableContainer
        pressThreshold={5}
        useWindowAsScrollContainer
        lockAxis="y"
        onSortEnd={this.onSortEnd}
        useDragHandle
      >
        {context.state.items.map((l, i) => {
          const unique = `key-num-${i}`;

          return (
            <SortableItem
              isrequired={l.isRequired}
              context={context}
              key={unique}
              indexis={i}
              index={i}
              question={l.Question}
              formtype={l.Field.type}
              ID={l.id}
            />
          );
        })}
      </SortableContainer>
    );
  }
}
export default connecter(Draghandle);
/*old
=================================
  {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}*/
/**
 * {items.map((f, i) => (
          <SortableItem
            key={`item-${i}`}
            index={i}
            value={f.Question}
            isReq={f.isRequired}
          />
        ))}
 * const [checked, setChecked] = React.useState([0]);
=====================================
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
 */

/**sortable item 
======================================
* {items.map((value, i) => {
          const labelId = `checkbox-list-label-${value.id}`;

          return (
            <SortableItem value={value} key={labelId} index={i} ID={value.id} />
          );
        })}
 * 
 
===========================================
<SortableContainer
        pressThreshold={5}
        useWindowAsScrollContainer
        lockAxis="y"
        onSortEnd={this.onSortEnd}
        useDragHandle
      >
======================================
 <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>      
*/
