import React from "react";
import firebaseApp from "../firebase";
import { Date } from "./Date";
import { useAuth } from "../contexts/AuthProvider";
import DeleteIcon from "@material-ui/icons/Delete";

export const Tasks = ({ page, tasks }) => {
  const { setTasks, currentUser } = useAuth();

  const handleArchived = async (item) => {
    await firebaseApp
      .firestore()
      .collection("tasks")
      .doc(item.docId)
      .update({ archived: !item.archived });

    const result = await firebaseApp
      .firestore()
      .collection("tasks")
      .where("userId", "==", currentUser.uid)
      .get();
    const data = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
    }));
    setTasks(data);
  };

  const handleDelete = async (item) => {
    console.log(item);
    firebaseApp.firestore().collection("tasks").doc(item.docId).delete();

    const result = await firebaseApp
      .firestore()
      .collection("tasks")
      .where("userId", "==", currentUser.uid)
      .get();
    const data = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
    }));
    setTasks(data);
  };

  return (
    <div className="task">
      <ul>
        <h2 className="task-head">{page}</h2>

        {tasks?.map((item) => (
          <li key={item.docId}>
            <div className="display-task-container">
              <div className="display-checkbox">
                <input
                  type="radio"
                  value={item.archived}
                  onChange={() => handleArchived(item)}
                  className="modal-form-checkbox"
                  id="check"
                />
              </div>
              <div className="display-data">
                <div>
                  <p className="display-task">{item.task}</p>
                  <Date date={item.date} />
                </div>
                <div>
                  <DeleteIcon
                    className="display-delete-icon"
                    onClick={() => handleDelete(item)}
                  />
                </div>
              </div>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};
