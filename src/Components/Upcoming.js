import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Tasks } from "./Tasks";
import { useAuth } from "../contexts/AuthProvider";

export default function HomePage() {
  const { tasks, upcomingTasks, setUpcomingTasks } = useAuth();

  useEffect(() => {
    const today = new Date();
    const futureTasks = tasks?.filter((item) => item?.date?.toDate() > today);
    const archivedTasks = futureTasks?.filter(
      (item) => item.archived === false
    );
    archivedTasks?.sort(function (a, b) {
      return a.date?.toDate() - b.date?.toDate();
    });
    setUpcomingTasks(archivedTasks);
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
            <Sidebar page={{ upcoming: true }} />
          </div>
          <div className="item-2">
            <Tasks page={"Upcoming"} tasks={upcomingTasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
