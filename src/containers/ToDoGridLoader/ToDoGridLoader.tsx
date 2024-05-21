import { useEffect, useState } from "react";
import { ToDoEntryResponse } from "../../services/api-responses.interface";
import {
  getAllToDoEntries,
  deleteToDoEntryById,
  updateToDoEntryById,
} from "../../services/todo-services";
import { ToDoFormData } from "../../components/ToDoForm/schema";
import ToDoCard from "../../components/ToDoCard/ToDoCard";
import styles from "./ToDoGridLoader.module.scss";

const ToDoGridPage = () => {
  const [toDoEntries, setToDoEntries] = useState<ToDoEntryResponse[]>([]);
  const [fetchStatus, setFetchStatus] = useState("");

  useEffect(() => {
    setFetchStatus("LOADING");
    getAllToDoEntries()
      .then((data) => {
        setFetchStatus("SUCCESS");
        setToDoEntries(data);
      })
      .catch((e) => {
        setFetchStatus("FAILED");
        console.warn(e);
      });
  }, []);

  const handleDeleteEntry = (id: number) => {
    deleteToDoEntryById(id)
      .then(() => {
        setToDoEntries((prevEntries) =>
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
        setToDoEntries((prevEntries) =>
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
        {toDoEntries.map((entry) => (
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
