import React, { createContext, createRef, forwardRef } from "react";
import update from "immutability-helper";
import { AllTypes } from "./FormType";
import { config } from "./Initial";
export const Contextulize = createContext();
export class ContextWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = createRef();
    //this.Instance;
    this.targetindex = 0;

    this.targetAnswerIndex = "";
    this.state = {
      updateFlag: false,

      items: [
        {
          id: "ref1",
          Question: "Why we live?",
          isRequired: false,
          isFocused: true,
          Field: {
            type: AllTypes.LinearScale
          },
          collection: ["vv", "cc", "lkk"]
        },
        {
          id: "ref2",
          Question: "How we live?",
          isRequired: true,
          isFocused: false,
          Field: {
            type: AllTypes.Paragraph
          },
          collection: ["fasdf", "erqr"]
        },
        {
          id: "ref3",
          Question: "Where we live?",
          isRequired: false,
          isFocused: false,
          Field: {
            type: AllTypes.LinearScale
          },
          collection: ["qwer", "qwerq", "qwet"]
        },
        {
          id: "ref4",
          Question: "When we live?",
          isRequired: true,
          isFocused: false,
          Field: {
            type: AllTypes.ShortAnswer
          },
          collection: ["wqer", "qwer"]
        }
      ],
      answers: [
        {
          formID: "ref1",
          values: [
            { id: "some1", value: "I am green" },
            { id: "some2", value: "and blue" },
            { id: "some3", value: "don't no why" }
          ]
        },
        {
          formID: "ref2",
          values: [
            { id: "some4", value: "this is" },
            { id: "some5", value: "test" },
            { id: "some6", value: "for the future" }
          ]
        },
        {
          formID: "ref3",
          values: [{ id: "some7", value: "this is" }]
        },
        {
          formID: "ref4",
          values: [
            { id: "some8", value: "test" },
            { id: "some9", value: "for the future" }
          ]
        }
      ],
      targetis: "ref1"
    };

    this.setTargetIndexById = id => {
      /**
       * [id] can be anything within array of objs
       */
      this.state.items.find((o, i) => {
        if (o.id === id) {
          return (this.targetindex = i);
        }
      });
    };
    this.setAnswerIndexById = id => {
      /**
       * [id] can be anything within answers[] of objs
       */
      return this.state.answers[this.targetindex].values.find((o, i) => {
        if (o.id === id) {
          return (this.targetAnswerIndex = i);
        }
      });
    };

    this.clearFocused = () => {
      this.setState({
        ...this.state,
        items: update(this.state.items, {
          [this.state.items.length - 1]: { isFocused: { $set: false } }
        })
      });
    };

    this.generateRandomID = () =>
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9);
  }
  updateTarget = id => {
    this.setTargetIndexById(id);
    return this.setState({
      ...this.state,
      targetis: update(this.state.targetis, { $set: id })
    });
  };
  changeQuistion = (v, id) => {
    this.setTargetIndexById(id);
    this.setState({
      ...this.state,
      items: update(this.state.items, {
        [this.targetindex]: { Question: { $set: v } }
      })
    });
  };
  initAnswer = ID => {
    //=>fix this
    let instance = config.defaultAnswer;
    let index;
    instance.formID = ID;

    this.state.answers.find((o, i) => {
      if (o.formID === ID) {
        return (index = i);
      } else {
        this.setState({
          ...this.state,
          answers: update(this.state.answers, { $push: [instance] })
        });
        index = i;
      }
    });
    return index;
  };
  addAnswer = (formID, obj) => {
    this.setTargetIndexById(formID);
    this.setState({
      ...this.state,
      answers: update(this.state.answers, {
        [this.targetindex]: { values: { $push: [obj] } }
      })
    });
  };
  setAnswer = (value, formID, ownID) => {
    this.setTargetIndexById(formID);
    this.setAnswerIndexById(ownID);
    this.setState({
      ...this.state,
      answers: update(this.state.answers, {
        [this.targetindex]: {
          values: { [this.targetAnswerIndex]: { value: { $set: value } } }
        }
      })
    });
  };
  deleteAnswer = (formID, ownID) => {
    this.setTargetIndexById(formID);
    this.setAnswerIndexById(ownID);
    this.setState({
      ...this.state,
      answers: update(this.state.answers, {
        [this.targetindex]: {
          values: { $splice: [[this.targetAnswerIndex, 1]] }
        }
      })
    });
  };
  addForm = () => {
    /**
     * Given [question] must be in 'defaultFormData' proptype depending on its formType
     */
    let FormInstance = Object.assign({}, config.default);
    let AnswerInstance = Object.assign({}, config.defaultAnswer);
    let _ID = this.generateRandomID();
    FormInstance.id = _ID;
    AnswerInstance.formID = _ID;
    this.setState({
      ...this.state,
      items: update(this.state.items, { $push: [FormInstance] }),
      answers: update(this.state.answers, { $push: [AnswerInstance] })
    });
  };
  deleteForm = formID => {
    this.setTargetIndexById(formID);
    this.setState({
      ...this.state,
      items: update(this.state.items, { $splice: [[this.targetindex, 1]] }),
      answers: update(this.state.answers, { $splice: [[this.targetindex, 1]] })
    });
  };
  changeFormTypeOf = (type, formID) => {
    /**
     * [type] must be string
     * [id] for id of item to support in finding obj
     */
    this.setTargetIndexById(formID);
    this.setState({
      ...this.state,
      items: update(this.state.items, {
        [this.targetindex]: { Field: { type: { $set: type } } }
      })
    });
  };
  handleRequiredState = (boolean, formID) => {
    this.setTargetIndexById(formID);
    this.setState({
      ...this.state,
      items: update(this.state.items, {
        [this.targetindex]: { isRequired: { $set: boolean } }
      })
    });
  };
  _ArrayMove = (arr, old_index, new_index) => {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
  };
  handleArrayMove = (old_index, new_index) => {
    this.setState({
      ...this.state,
      items: update(this.state.items, {
        $apply: () => this._ArrayMove(this.state.items, old_index, new_index)
      }),
      answers: update(this.state.answers, {
        $apply: () => this._ArrayMove(this.state.answers, old_index, new_index)
      })
    });
  };
  trycallback = e => {
    /*if(e){
      return this.changeFormTypeOf(e.target.value)
    }*/

    return console.log({ [e.value]: e });
  };
  getRef = () => {
    return this.myRef;
  };

  render() {
    return (
      <Contextulize.Provider
        value={{
          state: this.state,
          addForm: () => this.addForm(),
          deleteForm: e => this.deleteForm(e),
          changeType: (v, id) => this.changeFormTypeOf(v, id),
          setQuestion: (v, id) => this.changeQuistion(v, id),
          initAnswer: id => this.initAnswer(id),
          addAnswer: (id, obj) => this.addAnswer(id, obj),
          setAnswer: (v, outID, innerID) => this.setAnswer(v, outID, innerID),
          deleteAnswer: (ID, id) => this.deleteAnswer(ID, id),
          toggleIsRequired: (b, id) => this.handleRequiredState(b, id),
          dispatch: e => this.trycallback(e),
          onArrayMove: (pre, next) => this.handleArrayMove(pre, next),
          getIndex: id => this.setAnswerIndexById(id),
          setIsFocused: id => this.updateTarget(id),
          clear: () => this.clearFocused(),
          myRef: () => this.getRef()
        }}
      >
        {this.props.children}
      </Contextulize.Provider>
    );
  }
}
export const connecter = Component =>
  forwardRef((props, ref) => (
    <Contextulize.Consumer>
      {context => (
        <Component {...props} context={context} ref={ref}>
          {props.children}
        </Component>
      )}
    </Contextulize.Consumer>
  ));
