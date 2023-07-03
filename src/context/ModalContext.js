import { createContext, useContext, useReducer } from "react";

const contextProvider = createContext();

const initialState = {
  event: "add_new_board",
  tasks: [],
  subtasks: [],
  columns: [],
  boards: [],
  openModal: false,
  status: null,
  isTaskComplete: false,
  edit_delete: false,
  // title: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "addNewBoard":
      return {
        ...state,
        boards: action.payload,
        openModal: true,
        event: "add_new_board",
      };
    case "editBoard":
      return {
        ...state,
        openModal: true,
        event: "edit_board",
      };
    case "addColumn":
      return {
        ...state,
        columns: state.columns.push(action.payload),
        openModal: true,
      };
    case "addTask":
      return {
        ...state,
        tasks: state.tasks.push(action.payload),
        subtasks: state.subtasks.push(action.payload),
        openModal: true,
        status: action.payload,
        isTaskComplete: false,
        event: "add_task",
      };
    case "editTask":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        subtasks: [...state.subtasks, action.payload],
        openModal: true,
        status: action.payload,
        isTaskComplete: action.payload,
        event: "edit_task",
      };
    case "viewTask":
      return {
        ...state,
        status: action.payload,
        isTaskComplete: action.payload,
        openModal: true,
        event: "view_task",
      };
    case "deleteTask":
      const title = action.payload;
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.title !== title),
        openModal: true,
        event: "delete_task",
      };
    case "manageTask":
      return { ...state, edit_delete: !state.edit_delete };

    case "openModal":
      return { ...state, openModal: true, event: action.payload };
    case "closeModal":
      return { ...state, openModal: false };
    default:
      throw new Error("Unknown event");
  }
}

export default function ModalContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    tasks,
    columns,
    subtasks,
    openModal,
    status,
    isTaskComplete,
    event,
    edit_delete,
  } = state;

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        tasks,
        columns,
        subtasks,
        openModal,
        status,
        isTaskComplete,
        event,
        edit_delete,
      }}
    >
      {children}
    </contextProvider.Provider>
  );
}

export function UseModalContext() {
  const context = useContext(contextProvider);
  return context;
}
