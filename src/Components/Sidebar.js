import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import firebaseApp from "../firebase";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";

export const Sidebar = ({ page }) => {
  const history = useHistory();
  const { currentUser, projects, setProjects } = useAuth();
  const [active, setActive] = useState(page);
  const [project, setProject] = useState("");

  useEffect(() => {
    setActive(page);
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    firebaseApp.firestore().collection("projects").add({
      name: project,
      userId: currentUser.uid,
      notes: "",
    });

    const notes = await firebaseApp
      .firestore()
      .collection("projects")
      .where("userId", "==", currentUser.uid)
      .get();
    const info = notes.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
    }));
    setProjects(info);

    setProject("");
  };

  const handleDelete = async (item) => {
    await firebaseApp
      .firestore()
      .collection("projects")
      .doc(item.docId)
      .delete();

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

    if (projects.length === 1 || active.name === item.name) {
      history.push("/");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-items">
        <ul className="sidebar-list">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <li
              className={active?.inbox ? "active" : null}
              onClick={() => setActive({ inbox: true })}
            >
              <span>
                <MailOutlineIcon />
              </span>
              <span className="sidebar-icon-names">Inbox</span>
            </li>
          </Link>

          <Link to="/today" style={{ textDecoration: "none", color: "black" }}>
            <li
              className={active?.today ? "active" : null}
              onClick={() => setActive({ today: true })}
            >
              <span>
                <CalendarTodayIcon />
              </span>
              <span className="sidebar-icon-names">Today</span>
            </li>
          </Link>

          <Link
            to="/upcoming"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li
              className={active?.upcoming ? "active" : null}
              onClick={() => setActive({ upcoming: true })}
            >
              <span>
                <DateRangeIcon />
              </span>
              <span className="sidebar-icon-names">Upcoming</span>
            </li>
          </Link>

          <Link
            to="/completed"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li
              className={active?.completed ? "active" : null}
              onClick={() => setActive({ completed: true })}
            >
              <span>
                <EventAvailableIcon />
              </span>
              <span className="sidebar-icon-names">Completed</span>
            </li>
          </Link>

          <Link to="/missed" style={{ textDecoration: "none", color: "black" }}>
            <li
              className={active?.missed ? "active" : null}
              onClick={() => setActive({ missed: true })}
            >
              <span>
                <EventBusyIcon />
              </span>
              <span className="sidebar-icon-names">Missed</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="sidebar-notes">
        <h3>
          <span>
            <ExpandMoreIcon />
          </span>
          Notes
        </h3>
        <hr />
        <ul className="notes">
          {projects?.map((item) => (
            <li
              key={item.docId}
              className={active?.name === item.name ? "active" : null}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`./notes/${item.name}`}
                className="notes-link"
                onClick={() => history.push("/")}
              >
                {item.name}
              </Link>
              <DeleteIcon
                className="notes-delete-icon"
                onClick={() => handleDelete(item)}
              />
            </li>
          ))}
        </ul>
        <hr />
        <form className="notes-add" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="notes-input"
            type="text"
            placeholder="Project name..."
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
          <button disabled={!project} className="notes-add-btn" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
