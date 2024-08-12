import React, { useState } from "react";
import styles from "./App.module.css";

import {
  Sidebar,
  HeaderNav,
  Logo,
  ShowTaskDetails,
  AddTask,
  EditTask,
  DeleteTask,
  AddNewBoard,
  EditBoard,
  Column,
  Todo,
} from "./components";

import { useModalContext, useThemeContext, useTasksContext } from "./context";

const App = () => {
  const [clickedTask, setClickedTask] = useState(null);

  const { theme } = useThemeContext();
  const { boards: allBoards, currentBoard, columns } = useTasksContext();
  const { openModal, event, dispatch } = useModalContext();

  const cols = allBoards && allBoards[currentBoard]?.columns;

  // console.log(allBoards[currentBoard]?.name);

  function showTaskDetails(id) {
    setClickedTask(id);
    dispatch({ type: "viewTask" });
  }

  if (!allBoards) {
    return <p style={{ margin: "100px", textAlign: "center" }}>loading...</p>;
  }

  return (
    <>
      <main className={styles.layout}>
        <header>
          <Logo />
          <HeaderNav />
        </header>
        <div className={styles.layout_content}>
          <Sidebar />
          <main
            className={`${styles.main} ${theme === "dark" ? styles.dark : ""}`}
          >
            <div className={styles.columns}>
              {columns?.map((col) => {
                if (col.tasks?.length === 0) {
                  return null;
                } else {
                  return (
                    <div key={col.name}>
                      <Column title={col.name} todoNum={col.tasks?.length}>
                        <div className={styles.column_content}>
                          {col.tasks?.map((task, index) => (
                            <div key={index}>
                              <Todo
                                title={task.title}
                                completedSubTask={
                                  task.subtasks?.filter(
                                    (sub) => sub.isCompleted === true
                                  ).length
                                }
                                subtasks={task.subtasks?.length}
                                onClick={() => showTaskDetails(task.title)}
                              />
                            </div>
                          ))}
                        </div>
                      </Column>
                    </div>
                  );
                }
              })}
              {columns?.length > 0 && (
                <div className={styles.column}>
                  <p onClick={() => dispatch({ type: "editBoard" })}>
                    + New Column
                  </p>
                </div>
              )}
            </div>

            {columns?.length === 0 && (
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
          </main>
        </div>
      </main>

      {openModal && event === "add_task" && <AddTask cols={cols} />}
      {openModal && event === "view_task" && (
        <ShowTaskDetails clickedTask={clickedTask} />
      )}
      {openModal && event === "edit_task" && <EditTask />}
      {openModal && event === "delete_task" && <DeleteTask />}
      {openModal && event === "add_new_board" && <AddNewBoard />}
      {openModal && event === "edit_board" && <EditBoard />}
    </>
  );
};

export default App;
