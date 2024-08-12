import React, { useState } from "react";
import Modal from "../modal/Modal";
import Input from "../../ui/Input/Input";
import styles from "./AddNewBoard.module.css";
import cancel from "../../../assets/cancel.svg";
import { useTasksContext, useModalContext } from "../../../context";

const AddNewBoard = () => {
  const [boardName, setBoardName] = useState("");
  const [columnName, setColumnName] = useState("");
  const [newColumns, setNewColumns] = useState([]);

  const { addNewBoard, boards } = useTasksContext();
  const { dispatch } = useModalContext();

  function handleAddNewBoard(e) {
    e.preventDefault();

    if (columnName) {
      handleAddColumn();
    }

    // if (boardName.trim === "") return;
    if (boardName) {
      const newBoard = {
        id: boards.length + 1,
        name: boardName,
        columns: newColumns,
      };
      addNewBoard(newBoard);
    }
    setBoardName("");
    dispatch({ type: "closeModal" });
  }

  function handleAddColumn() {
    if (columnName.trim === "") {
      return;
    }
    const newColumn = {
      name: columnName,
      tasks: [],
    };
    setNewColumns((prevCols) => [...prevCols, newColumn]);
    setColumnName("");
  }
  function handleDeleteColumn(index) {
    const updatedColumns = [...newColumns];
    updatedColumns.splice(index, 1);
    setNewColumns(updatedColumns);
  }

  return (
    <Modal>
      <div className={styles.board}>
        <h4>Add New Baord</h4>
        <form onSubmit={handleAddNewBoard}>
          <label htmlFor="boardName">Name</label>
          <Input
            placeholder="e.g. Web Design"
            id="boardName"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />

          <label htmlFor="column">Columns</label>

          {newColumns?.map((col, index) => (
            <div className={styles.columns} key={index}>
              <Input
                placeholder="e.g. Todo"
                id="column"
                value={col.name}
                onChange={(e) => {
                  const updatedNewCols = [...newColumns];
                  updatedNewCols[index].name = e.target.value;
                  setNewColumns(updatedNewCols);
                }}
              />
              <img
                alt="cancel icon"
                src={cancel}
                onClick={() => handleDeleteColumn(index)}
              />
            </div>
          ))}

          <div className={styles.buttons}>
            <button
              type="button"
              id={styles.add_newColumn}
              onClick={handleAddColumn}
            >
              + Add New Column
            </button>
            <button type="submit" id={styles.create_newBoard}>
              + Create New Board
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddNewBoard;
