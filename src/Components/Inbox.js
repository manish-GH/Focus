import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Tasks } from "./Tasks";
import { useAuth } from "../contexts/AuthProvider";

export default function Inbox() {
  const { tasks, inboxTasks, setInboxTasks } = useAuth();

  useEffect(() => {
    const today = new Date();
    const futureTasks = tasks?.filter(
      (item) =>
        item?.date?.toDate() > today ||
        (item?.date.toDate().getDate() === today.getDate() &&
          item?.date.toDate().getMonth() === today.getMonth() &&
          item?.date.toDate().getFullYear() === today.getFullYear())
    );
    const archivedTasks = futureTasks?.filter(
      (item) => item.archived === false
    );
    archivedTasks?.sort(function (a, b) {
      return a.date?.toDate() - b.date?.toDate();
    });
    setInboxTasks(archivedTasks?.filter((item) => item.important === true));
    // eslint-disable-next-line
  }, [tasks]);

  return (
    <div className="home">
      <div className="sticky">
        <Navbar />
      </div>
      <div className="content">
        <div className="grid-container">
          <div className="item-1">
            <Sidebar page={{ inbox: true }} />
          </div>
          <div className="item-2">
            <Tasks page={"Inbox"} tasks={inboxTasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
