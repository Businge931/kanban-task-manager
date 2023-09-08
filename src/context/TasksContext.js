import { createContext, useContext, useEffect, useState } from "react";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(0);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [subTasks, setSubTasks] = useState([
    { id: 1, title: "", isComplete: false },
  ]);
  //   const [status, setStatus] = useState();

  const BASE_URL = "http://localhost:5000/boards";

  useEffect(() => {
    function fetchAllBoards() {
      try {
        fetch(BASE_URL)
          .then((res) => {
            if (!res.ok) throw new Error("Unable to load Boards");
            return res.json();
          })
          .then((data) => {
            setBoards(data);
          });
      } catch (error) {
        setError(error);
      }
    }
    fetchAllBoards();
  }, []);

  async function addNewBoard(newBoard) {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(newBoard),
        headers: { "content-type": "application/json" },
      });

      if (!res.ok) throw new Error("There was an error creating a new board");

      setBoards((prevBoards) => [...prevBoards, newBoard]);
    } catch (error) {
      setError(error);
    }
  }

  const addNewColumn = async (newColumn) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(newColumn),
        headers: { "content-type": "application/json" },
      });

      if (!res.ok) throw new Error("There was an error creating a new column");
      return boards[currentBoard]?.columns.push(newColumn);
    } catch (error) {
      setError(error);
    }
  };

  async function addNewTask(newTask) {
    try {
      const res = fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "content-type": "application/json" },
      });

      if (!res.ok) throw new Error("There was an error adding new task");
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    setColumns(boards[currentBoard]?.columns);
    setBoardName(boards[currentBoard]?.name);
  }, [currentBoard, boards]);

  return (
    <TasksContext.Provider
      value={{
        boards,
        currentBoard,
        boardName,
        setCurrentBoard,
        columns,
        tasks,
        subTasks,
        setSubTasks,

        addNewTask,
        addNewBoard,
        addNewColumn,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export default function useTasksContext() {
  const context = useContext(TasksContext);
  if (!context)
    throw new Error("Component must be wrapped inside Tasks Context...");
  return context;
}
