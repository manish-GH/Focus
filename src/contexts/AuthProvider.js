import React, { createContext, useContext, useState, useEffect } from "react";
import firebaseApp from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState();
  const [projects, setProjects] = useState();
  const [inboxTasks, setInboxTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [missedTasks, setMissedTasks] = useState([]);

  // function signup(email, password) {
  //   return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
  // }

  function login(email, password) {
    return firebaseApp.auth().signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return firebaseApp.auth().signOut();
  }

  const value = {
    inboxTasks,
    setInboxTasks,
    todayTasks,
    setTodayTasks,
    upcomingTasks,
    setUpcomingTasks,
    completedTasks,
    setCompletedTasks,
    missedTasks,
    setMissedTasks,
    currentUser,
    tasks,
    setTasks,
    projects,
    setProjects,
    login,
    logout,
  };

  useEffect(() => {
    const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    async function getUserById(id) {
      const result = await firebaseApp
        .firestore()
        .collection("tasks")
        .where("userId", "==", id)
        .get();
      const data = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
      }));
      setTasks(data);

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
    }
    if (currentUser?.uid) {
      getUserById(currentUser.uid);
    }
    // eslint-disable-next-line
  }, [currentUser]);

  if (loading) return "Loading...";

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
