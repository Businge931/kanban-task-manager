import React from "react";
import styles from "./App.module.css";

import Logo from "./components/Logo/Logo";
import HeaderNav from "./components/HeaderNav/HeaderNav";
import Sidebar from "./components/sidebar/Sidebar";
import AddTask from "./components/Task/AddTask";
import ShowTaskDetails from "./components/Task/ShowTaskDetails";
import EditTask from "./components/Task/EditTask";
import DeleteTask from "./components/Task/DeleteTask";
import EditBoard from "./components/Board/EditBoard";
import AddNewBoard from "./components/Board/AddNewBoard";

import { UseModalContext } from "./context/ModalContext";
import Column from "./components/Column/Column";
import Todo from "./components/Todo/Todo";

const App = () => {
  const { openModal, event, tasks, columns, dispatch } = UseModalContext();

  // function addTask() {}

  return (
    <>
      <div className={styles.layout}>
        <header>
          <Logo />
          <HeaderNav />
        </header>
        <div className={styles.layout_content}>
          <Sidebar />
          <main className={styles.main}>
            {tasks.length > 0 && columns.length > 0 && (
              <div className={styles.column}>
                <p
                  onClick={() =>
                    dispatch({ type: "openModal", payload: "edit_board" })
                  }
                >
                  + New Column
                </p>
              </div>
            )}

            {tasks?.length === 0 && columns?.length === 0 && (
              <div className={styles.empty}>
                <p>This board is empty. Create a new column to get started.</p>
                <button
                  onClick={() =>
                    dispatch({ type: "editBoard", payload: "edit_board" })
                  }
                >
                  +Add New Column
                </button>
              </div>
            )}
            <div className={styles.columns}>
              {/* <Column>
                <Todo title="Build UI for onboarding flow" />
                <Todo title="Build UI for search" />
                <Todo title="Build settings UI" />
              </Column>
              <Column>
                <Todo title="Design settings and search pages" />
                <Todo title="Build UI for search" />
                <Todo title="Build settings UI" />
                <Todo title="Build settings UI" />
              </Column> */}
              {tasks?.length > 0 && columns?.length > 0 && (
                <div className={styles.column}>
                  <p onClick={() => dispatch({ type: "addNewColumn" })}>
                    + New Column
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {openModal && event === "add_task" && <AddTask />}
      {openModal && event === "view_task" && <ShowTaskDetails />}
      {openModal && event === "edit_task" && <EditTask />}
      {openModal && event === "delete_task" && <DeleteTask />}
      {openModal && event === "add_new_board" && <AddNewBoard />}
      {openModal && event === "edit_board" && <EditBoard />}
    </>
  );
};

export default App;
