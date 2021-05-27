import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../contexts/AuthProvider";
import { useParams } from "react-router-dom";
import { DisplayNote } from "./DisplayNote";

export default function Notes() {
  const { projects } = useAuth();
  const { name } = useParams();
  const [note, setNote] = useState();

  useEffect(() => {
    async function getNotes() {
      const displayNote = projects?.filter((item) => item.name === name);

      if (displayNote?.length > 0) {
        setNote(displayNote[0]);
      }
    }
    getNotes();
    // eslint-disable-next-line
  }, [name]);

  return (
    <div className="home">
      <div className="sticky">
        <Navbar />
      </div>
      <div className="content">
        <div className="grid-container">
          <div className="item-1">
            <Sidebar page={{ name: name }} />
          </div>
          <div className="item-2">
            <DisplayNote page={name} tasks={note} />
          </div>
        </div>
      </div>
    </div>
  );
}
