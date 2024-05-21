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

const ToDoGridPage = () => {
  const { entries, setEntries } = useContext(EntriesContext);
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
        console.warn(e);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {fetchStatus === "LOADING" && <h2>...LOADING...</h2>}
        {fetchStatus === "FAILED" && <h2>...FAILED TO LOAD...</h2>}
        {entries.map((entry) => (
          <ToDoCard
            key={entry.id}
            toDoEntry={entry}
            onDelete={handleDeleteEntry}
            onSubmit={handleUpdateEntry}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDoGridPage;
