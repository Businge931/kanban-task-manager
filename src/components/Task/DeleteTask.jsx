import React from "react";
import Modal from "../modal/Modal";
import styles from "./DeleteTask.module.css";
import { UseModalContext } from "../../context/ModalContext";

const DeleteTask = () => {
  const { dispatch } = UseModalContext();
  return (
    <Modal>
      <div className={styles.delete_task}>
        <h4>Delete this board?</h4>
        <p>
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className={styles.delete_buttons}>
          <button
            onClick={() => dispatch({ type: "deleteTask" })}
            id={styles.delete}
          >
            Delete
          </button>
          <button
            onClick={() => dispatch({ type: "closeModal" })}
            id={styles.cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTask;
