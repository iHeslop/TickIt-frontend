import { useContext } from "react";
import { createToDoEntry } from "../../services/todo-services";
import { ToDoFormData } from "../../components/ToDoForm/schema";
import ToDoForm from "../../components/ToDoForm/ToDoForm";
import styles from "./NewToDoLoader.module.scss";
import { EntriesContext } from "../../context/EntriesContextProvider";
import ToDo from "../../assets/todo.png";

const NewToDoPage = () => {
  const { entries, setEntries } = useContext(EntriesContext);

  const onSubmit = (data: unknown) => {
    createToDoEntry(data as ToDoFormData)
      .then((data) => {
        console.log("ToDo Entry Created", data);
        setEntries([...entries, data]);
      })
      .catch((e) => {
        console.warn(e);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.imageBox}>
        <img src={ToDo} alt="todo" className={styles.image} />
      </div>
      <div className={styles.box}>
        <h1 className={styles.title}>TickIt</h1>
        <ToDoForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default NewToDoPage;
