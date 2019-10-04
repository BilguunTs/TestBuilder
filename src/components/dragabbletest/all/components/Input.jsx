/**
 * [context] and [id] must be received by spread operator
 *
 * ========================================================================
 * <bug>Re-renders in each time key is pressed regardless of mutation </bug>
 * <debug=> compare previous and next props by using reactEffect callback
 * ========================================================================
 */
import React from "react";
import { Input } from "@material-ui/core";
import { connecter } from "../Context";
function InPut(props) {
  const Ref = React.useRef();
  const { context, id, intype, defaultValue, placeholder, answerID } = props;
  var typingTimer; //timer identifier

  const handleOnKeyUp = () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, 1500);
  };
  const handleOnKeyDown = () => {
    clearTimeout(typingTimer);
  };
  function doneTyping() {
    if (intype === "ask") {
      return context.setQuestion(Ref.current.value, id);
    } else {
      return context.setAnswer(Ref.current.value, id, answerID);
    }
  }

  return intype === "ask" ? (
    <Input
      type="input"
      onKeyUp={() => handleOnKeyUp()}
      onKeyDown={() => handleOnKeyDown()}
      defaultValue={defaultValue || ""}
      inputRef={Ref}
      placeholder={placeholder || "question"}
      inputProps={{
        "aria-label": "description"
      }}
    />
  ) : intype === "answer" ? (
    <Input
      type="input"
      onKeyUp={() => handleOnKeyUp()}
      onKeyDown={() => handleOnKeyDown()}
      defaultValue={defaultValue || ""}
      inputRef={Ref}
      placeholder={placeholder || "options"}
      inputProps={{
        "aria-label": "description"
      }}
    />
  ) : (
    <Input
      type="input"
      disableUnderline
      defaultValue="null"
      inputRef={Ref}
      placeholder={placeholder || "undefined"}
      inputProps={{
        "aria-label": "description"
      }}
    />
  );
}
export default connecter(InPut);
