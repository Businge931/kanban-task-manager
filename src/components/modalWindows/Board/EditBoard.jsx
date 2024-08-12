import React, { useState } from "react";
import styles from "./AddNewBoard.module.css";
import Modal from "../modal/Modal";
import Input from "../../ui/Input/Input";
import cancel from "../../../assets/cancel.svg";
import { useTasksContext } from "../../../context";

const EditBoard = () => {
  const [columnName, setColumnName] = useState("");
  const [newColumns, setNewColumns] = useState([]);

  const { addNewColumn, boardName } = useTasksContext();

  const newColumn = { name: columnName, tasks: [] };

  function handleSubmit(e) {
    e.preventDefault();

    addNewColumn(newColumn);
  }

  function handleAddNewColumn() {
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
        <h4>Edit Board</h4>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <Input defaultValue={boardName} readOnly={true} />

          <label>Columns</label>
          {newColumns?.map((column, index) => (
            <div className={styles.columns} key={index}>
              <Input
                placeholder="e.g. Drink coffee & smile"
                value={column.name}
                onChange={(e) => {
                  const updatedColumns = [...newColumns];
                  updatedColumns[index].name = e.target.value;
                  setNewColumns(updatedColumns);
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
              onClick={handleAddNewColumn}
            >
              + Add New Column
            </button>
            <button type="submit" id={styles.create_newBoard}>
              Save changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditBoard;
