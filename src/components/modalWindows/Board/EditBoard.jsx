import React from "react";
import styles from "./AddNewBoard.module.css";
import Modal from "../modal/Modal";
import Input from "../../ui/Input/Input";
import cancel from "../../../assets/cancel.svg";
import { UseModalContext } from "../../../context/ModalContext";

const EditBoard = () => {
  // const [name, setName] = useState("");

  const { columns, dispatch } = UseModalContext();
  console.log(columns);

  function handleSubmit(e) {
    e.preventDefault();
  }

  function addNewColumn(e) {
    e.preventDefault();
    dispatch({
      type: "addColumn",
      payload: "",
    });
  }

  return (
    <Modal>
      <div className={styles.board}>
        <h4>Edit Board</h4>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <Input placeholder="e.g. Web Design" defaultValue="" />

          <label>Columns</label>
          {columns?.map((column, index) => (
            <div className={styles.columns} key={index}>
              <Input placeholder="e.g. Drink coffee & smile" />
              <img alt="cancel icon" src={cancel} />
            </div>
          ))}

          <div className={styles.buttons}>
            <button id={styles.add_newColumn} onClick={addNewColumn}>
              + Add New Column
            </button>
            <button id={styles.create_newBoard}>Save changes</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditBoard;
