import { useEffect, useState } from "react";
import { ToDoEntryResponse } from "../../services/api-responses.interface";
import { getAllToDoEntries } from "../../services/todo-services";
import ToDoCard from "../../components/ToDoCard/ToDoCard";

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

  return (
    <>
      <h1>The ToDo Grid Page</h1>
      {fetchStatus === "LOADING" && <h2>...LOADING...</h2>}
      {fetchStatus === "FAILED" && <h2>...FAILED TO LOAD...</h2>}
      {toDoEntries.map((entry) => (
        <ToDoCard key={entry.id} toDoEntry={entry} />
      ))}
    </>
  );
};

export default ToDoGridPage;
