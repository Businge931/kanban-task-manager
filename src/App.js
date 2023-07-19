import React, { useEffect, useState } from "react";
import styles from "./App.module.css";

import Sidebar from "./components/sidebar/Sidebar";
import Logo from "./components/ui/Logo/Logo";
import HeaderNav from "./components/ui/HeaderNav/HeaderNav";
import ShowTaskDetails from "./components/modalWindows/Tasks/ShowTaskDetails";
import AddTask from "./components/modalWindows/Tasks/AddTask";
import EditTask from "./components/modalWindows/Tasks/EditTask";
import DeleteTask from "./components/modalWindows/Tasks/DeleteTask";
import AddNewBoard from "./components/modalWindows/Board/AddNewBoard";
import EditBoard from "./components/modalWindows/Board/EditBoard";

import { UseModalContext } from "./context/ModalContext";
import Column from "./components/Column/Column";
import Todo from "./components/Todo/Todo";
import { useThemeContext } from "./context/ThemeContext";
import UseTasksContext from "./context/TasksContext";

const App = () => {
  const [clickedTask, setClickedTask] = useState(null);
  const { theme } = useThemeContext();
  const { openModal, event, dispatch } = UseModalContext();
  const {
    boards: allBoards,
    currentBoard,
    columns,
    setColumns,
  } = UseTasksContext();

  const cols = allBoards && allBoards[currentBoard]?.columns;

  useEffect(() => {
    function fetchBoards() {
      setColumns(cols);
    }
    fetchBoards();
  }, [dispatch, allBoards, currentBoard, cols, setColumns]);

  function showTaskDetails(id) {
    setClickedTask(id);
    dispatch({ type: "viewTask" });
  }

  if (!allBoards) {
    return <p style={{ margin: "100px", textAlign: "center" }}>loading...</p>;
  }

  return (
    <>
      <div className={styles.layout}>
        <header>
          <Logo />
          <HeaderNav currentBoard={currentBoard} />
        </header>
        <div className={styles.layout_content}>
          <Sidebar />
          <main
            className={`${styles.main} ${theme === "dark" ? styles.dark : ""}`}
          >
            <div className={styles.columns}>
              {columns?.map((col) => {
                if (col.tasks.length === 0) {
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
                  <p onClick={() => dispatch({ type: "addNewColumn" })}>
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
      </div>

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
