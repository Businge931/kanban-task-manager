import React from "react";
import Modal from "../modal/Modal";
import Input from "../Input/Input";
import styles from "./AddNewBoard.module.css";
import cancel from "../../assets/cancel.svg";

const AddNewBoard = () => {
  return (
    <Modal>
      <div className={styles.board}>
        <h4>Add New Baord</h4>
        <form>
          <label>Name</label>
          <Input placeholder="e.g. Web Design" />

          <label>Columns</label>
          <div className={styles.columns}>
            <Input placeholder="e.g. Drink coffee & smile" />
            <img alt="cancel icon" src={cancel} />
          </div>

          <div className={styles.columns}>
            <Input placeholder="e.g. Drink coffee & smile" />
            <img alt="cancel icon" src={cancel} />
          </div>

          <div className={styles.buttons}>
            <button id={styles.add_newColumn}>+ Add New Column</button>
            <button id={styles.create_newBoard}>+ Create New Board</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddNewBoard;
