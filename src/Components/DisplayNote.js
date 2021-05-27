import React, { useState, useEffect } from "react";
import firebaseApp from "../firebase";
import { useAuth } from "../contexts/AuthProvider";

export const DisplayNote = ({ page, tasks }) => {
  const [note, setNote] = useState();
  const { currentUser, setProjects } = useAuth();

  useEffect(() => {
    setNote(tasks?.notes);
  }, [tasks]);

  const handleSave = async () => {
    await firebaseApp
      .firestore()
      .collection("projects")
      .doc(tasks?.docId)
      .update({ notes: note });

    const result = await firebaseApp
      .firestore()
      .collection("projects")
      .where("userId", "==", currentUser.uid)
      .get();
    const data = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
    }));
    setProjects(data);
  };

  return (
    <div className="display-note">
      <h2 className="task-head">{page}</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="note-textarea"
      />
      <button className="note-save" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};
