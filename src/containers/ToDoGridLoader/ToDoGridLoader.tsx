import { useContext, useEffect, useState } from "react";
import {
  getAllToDoEntries,
  deleteToDoEntryById,
  updateToDoEntryById,
} from "../../services/todo-services";
import { ToDoFormData } from "../../components/ToDoForm/schema";
import ToDoCard from "../../components/ToDoCard/ToDoCard";
import styles from "./ToDoGridLoader.module.scss";
import { EntriesContext } from "../../context/EntriesContextProvider";
import { toast } from "react-toastify";

const ToDoGridLoader = () => {
  const { entries, setEntries } = useContext(EntriesContext);
  const [showCompleted, setShowCompleted] = useState(false);
  const [fetchStatus, setFetchStatus] = useState("");

  useEffect(() => {
    setFetchStatus("LOADING");
    getAllToDoEntries()
      .then((data) => {
        setFetchStatus("SUCCESS");
        setEntries(data);
      })
      .catch((e) => {
        setFetchStatus("FAILED");
        toast.error("Failed to fetch entries");
        console.warn(e);
      });
  }, []);

  const handleDeleteEntry = (id: number) => {
    deleteToDoEntryById(id)
      .then(() => {
        setEntries((prevEntries) =>
          prevEntries.filter((entry) => entry.id !== id)
        );
      })
      .catch((e) => {
        toast.error("Failed to delete entry");
        console.warn("Failed to delete entry", e);
      });
  };

  const handleUpdateEntry = (id: number, data: ToDoFormData) => {
    updateToDoEntryById(id, data)
      .then((updatedEntry) => {
        setEntries((prevEntries) =>
          prevEntries.map((entry) => (entry.id === id ? updatedEntry : entry))
        );
        console.log("ToDo Entry Updated", updatedEntry);
      })
      .catch((e) => {
        toast.error("Failed to update entry");
        console.warn(e);
      });
  };

  const filteredEntries = showCompleted
    ? entries.filter((entry) => entry.completed)
    : entries.filter((entry) => !entry.completed);

  const handleSwitchView = () => {
    setShowCompleted(!showCompleted);
  };

  const handleStatusChange = (id: number, completed: boolean) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, completed } : entry
      )
    );
  };

  return (
    <div className={styles.container} data-testid="todo-grid">
      <div className={styles.selectBox}>
        <p
          className={`${styles.selectBox_btn} ${
            showCompleted ? "" : styles.selected
          }`}
          onClick={handleSwitchView}
        >
          Incomplete
        </p>
        <p
          className={`${styles.selectBox_btn2} ${
            showCompleted ? styles.selected : ""
          }`}
          onClick={handleSwitchView}
        >
          Completed
        </p>
      </div>
      <div className={styles.list}>
        {fetchStatus === "LOADING" && <h2>...LOADING...</h2>}
        {fetchStatus === "FAILED" && <h2>...FAILED TO LOAD...</h2>}
        {filteredEntries.map((entry) => (
          <ToDoCard
            key={entry.id}
            toDoEntry={entry}
            onDelete={handleDeleteEntry}
            onSubmit={handleUpdateEntry}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDoGridLoader;
