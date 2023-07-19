import React, { useState } from "react";
import Modal from "../modal/Modal";
import Input from "../../ui/Input/Input";
import styles from "./AddNewBoard.module.css";
import cancel from "../../../assets/cancel.svg";
import UseTasksContext from "../../../context/TasksContext";

const AddNewBoard = () => {
  const [boardName, setBoardName] = useState("");
  const [columnName, setColumnName] = useState("");

  const { boards, setBoards, tasks, addNewBoard } = UseTasksContext();

  function handleAddNewBoard(e) {
    e.preventDefault();

    if (!boardName || !columnName) return;

    const newBoard = { boardName, columns: [{ columnName, tasks }] };
    addNewBoard(newBoard);
  }

  function handleAddColumn(e) {
    e.preventDefault();

    // const col = { columnName, tasks };
    // setBoards((prev) => [...prev, col]);
  }
  function handleDeleteColumn(index) {
    // setBoards((prev) => prev.filter(prev.index === index));
  }

  return (
    <Modal>
      <div className={styles.board}>
        <h4>Add New Baord</h4>
        <form>
          <label htmlFor="boardName">Name</label>
          <Input
            placeholder="e.g. Web Design"
            id="boardName"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />

          <label htmlFor="column">Columns</label>
          <div className={styles.columns}>
            <Input
              placeholder="e.g. Todo"
              id="column"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
            />
            <img alt="cancel icon" src={cancel} onClick={handleDeleteColumn} />
          </div>
          {/* {columns?.map((col, index) => (
            <div className={styles.columns}>
              <Input
                placeholder="e.g. Todo"
                id="column"
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
              />
              <img
                alt="cancel icon"
                src={cancel}
                onClick={() => handleDeleteColumn(index)}
              />
            </div>
          ))} */}

          <div className={styles.buttons}>
            <button id={styles.add_newColumn} onClick={handleAddColumn}>
              + Add New Column
            </button>
            <button
              // type="submit"
              onClick={handleAddNewBoard}
              id={styles.create_newBoard}
            >
              + Create New Board
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddNewBoard;
