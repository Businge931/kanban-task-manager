import { createContext, useContext, useReducer } from "react";

const contextProvider = createContext();

const initialState = {
  event: "add_new_board",
  openModal: false,
  edit_delete: false,
};

function reducer(state, action) {
  //WHEN OPENING MODAL ONLY
  switch (action.type) {
    case "addNewBoard":
      return {
        ...state,
        openModal: true,
        event: "add_new_board",
      };
    case "editBoard":
      return {
        ...state,
        openModal: true,
        event: "edit_board",
      };
    // case "addColumn":
    //   return {
    //     ...state,
    //     openModal: true,
    //   };
    case "addTask":
      return {
        ...state,
        openModal: true,
        event: "add_task",
      };
    case "editTask":
      return {
        ...state,
        openModal: true,
        event: "edit_task",
      };
    case "viewTask":
      return {
        ...state,
        openModal: true,
        event: "view_task",
      };
    case "deleteTask":
      return {
        ...state,
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

export function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { openModal, event, edit_delete } = state;

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        event,
        edit_delete,
        openModal,
      }}
    >
      {children}
    </contextProvider.Provider>
  );
}

export default function useModalContext() {
  const context = useContext(contextProvider);
  if (!context)
    throw new Error("Component must be wrapped inside modalContext");
  return context;
}
