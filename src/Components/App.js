import { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Switch, Route, useHistory } from "react-router-dom";
import Inbox from "./Inbox";
import Login from "./Login";
import SignUp from "./SignUp";
import Today from "./Today";
import Upcoming from "./Upcoming";
import Completed from "./Completed";
import Missed from "./Missed";
import Notes from "./Notes";

function App() {
  const history = useHistory();
  const { currentUser } = useAuth();
  useEffect(() => {
    history.push(!!currentUser ? "/" : "/login");
  }, [currentUser, history]);

  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <div className="w-100">
        <Switch>
          <Route exact path="/" component={Inbox} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/today" component={Today} />
          <Route path="/upcoming" component={Upcoming} />
          <Route path="/completed" component={Completed} />
          <Route path="/missed" component={Missed} />
          <Route path="/notes/:name" component={Notes} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
