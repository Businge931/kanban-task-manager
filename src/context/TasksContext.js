import { createContext, useContext, useEffect, useState } from "react";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [boards, setBoards] = useState(null);
  const [error, setError] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(0);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [subTasks, setSubTasks] = useState([
    { id: 1, title: "", isComplete: false },
  ]);
  //   const [status, setStatus] = useState();

  const BASE_URL = "data.json";

  useEffect(() => {
    function fetchAllBoards() {
      try {
        fetch(BASE_URL)
          .then((res) => {
            if (!res.ok) throw new Error("Unable to load Boards");
            return res.json();
          })
          .then((data) => {
            setBoards(data.boards);
          });
      } catch (error) {
        setError(error);
      }
    }
    fetchAllBoards();
  }, []);

  async function addNewBoard(newBoard) {
    try {
      const req = fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(newBoard),
        headers: { "content-type": "application/json" },
      });

      if (!req.ok) throw new Error("There was an error creating a new board");

      setBoards((prev) => [...prev, req]);
      console.log(req);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <TasksContext.Provider
      value={{
        boards,
        currentBoard,
        setCurrentBoard,
        columns,
        setColumns,
        addNewBoard,
        tasks,
        setTasks,
        subTasks,
        setSubTasks,
        // status,
        // setStatus,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export default function UseTasksContext() {
  const context = useContext(TasksContext);
  if (!context)
    throw new Error("Component must be wrapped inside Tasks Context...");
  return context;
}
