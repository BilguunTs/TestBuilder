import { AllTypes } from "./FormType";
export const InitialData = {
  columns: [
    {
      id: "#column-1",
      title: "FormBuilder",
      tasks: [
        { id: "#task-1", content: "" },
        { id: "#task-2", content: "" },
        { id: "#task-3", content: "" },
        { id: "#task-4", content: "" }
      ]
    }
  ],
  ColumnOrder: []
};
const DemoData = {
  tasks: {
    "task-1": { id: "#task-1", content: "" },
    "task-2": { id: "#task-2", content: "" },
    "task-3": { id: "#task-2", content: "" },
    "task-4": { id: "#task-2", content: "" }
  },
  columns: {
    "column-1": {
      id: "#column-1",
      title: "FormBuilder",
      taskIds: ["#task-1", "#task-2", "#task-3", "#task-4"]
    }
  },
  ColumnOrder: ["column-1"]
};
export const config = {
  default: {
    id: "",
    Question: "",
    isRequired: false,
    isFocused: false,
    Field: {
      type: AllTypes.ShortAnswer,
      choices: []
    },
    collection: []
  },
  defaultAnswer: {
    formID: "",
    values: []
  }
};
