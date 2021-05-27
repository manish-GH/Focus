import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Tasks } from "./Tasks";
import { useAuth } from "../contexts/AuthProvider";

export default function HomePage() {
  const { tasks, completedTasks, setCompletedTasks } = useAuth();

  useEffect(() => {
    const archivedTasks = tasks?.filter((item) => item.archived === true);
    archivedTasks?.sort(function (a, b) {
      return b.date.toDate() - a.date.toDate();
    });
    setCompletedTasks(archivedTasks);
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
            <Sidebar page={{ completed: true }} />
          </div>
          <div className="item-2">
            <Tasks page={"Completed"} tasks={completedTasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
