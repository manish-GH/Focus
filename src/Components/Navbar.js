import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useHistory, Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Modal from "react-modal";
import firebaseApp from "../firebase";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
  overlay: {
    background: "rgba(246, 244, 244,0.85)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "visible",
    border: "none",
  },
};

Modal.setAppElement("#root");

export const Navbar = () => {
  // eslint-disable-next-line
  const { logout, currentUser, tasks, setTasks } = useAuth();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [date, setDate] = useState(new Date());
  const [important, setImportant] = useState(false);

  const newTaskHandler = async (e) => {
    e.preventDefault();
    setModal(false);

    await firebaseApp.firestore().collection("tasks").add({
      archived: false,
      important: important,
      date: date,
      task: newTask,
      userId: currentUser.uid,
    });

    const result = await firebaseApp
      .firestore()
      .collection("tasks")
      .where("task", "==", newTask)
      .get();

    const additionalTask = result?.docs?.map((item) => ({
      ...item.data(),
      docId: item.id,
    }));

    setTasks((tasks) => [...tasks, additionalTask[0]]);

    setNewTask("");
    setDate(new Date());
  };

  const handleClick = async () => {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("Failed to log out");
    }
  };

  return (
    <div className="header">
      <nav>
        <div>
          <Link style={{ textDecoration: "none" }} className="brand" to="/">
            Focus
          </Link>
        </div>
        <div className="add-icon">
          <AddIcon fontSize="large" onClick={() => setModal(true)} />
          <Modal
            isOpen={modal}
            onRequestClose={() => setModal(false)}
            style={customStyles}
          >
            <div className="modal-container">
              <h2 className="modal-text">Quick Add Task</h2>

              <form onSubmit={(e) => newTaskHandler(e)} className="modal-form">
                <div className="modal-input-fields">
                  <p>Task: </p>
                  <input
                    className="modal-input-task"
                    type="text"
                    placeholder="Add task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                </div>

                <div className="modal-date-imp">
                  <div className="modal-input-fields">
                    <p>Schedule: </p>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                    />
                  </div>

                  <div
                    onClick={() => setImportant(!important)}
                    className="modal-important"
                  >
                    <input
                      type="checkbox"
                      value={important}
                      onChange={() => setImportant(!important)}
                      className="modal-form-checkbox"
                      id="checkbox"
                    />
                    <label htmlFor="checkbox"> Important</label>
                  </div>
                </div>
                <div className="modal-btns">
                  <button
                    disabled={newTask.length === 0}
                    className="modal-add-btn"
                    type="submit"
                  >
                    Add Task
                  </button>
                  <button
                    className="modal-cancel-btn"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
        <div>
          <button className="logout-btn" variant="link" onClick={handleClick}>
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
};
