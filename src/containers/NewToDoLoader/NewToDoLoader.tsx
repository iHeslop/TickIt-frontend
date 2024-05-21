import { createToDoEntry } from "../../services/todo-services";
import { ToDoFormData } from "../../components/ToDoForm/schema";
import ToDoForm from "../../components/ToDoForm/ToDoForm";
import styles from "./NewToDoLoader.module.scss";

const NewToDoPage = () => {
  const onSubmit = (data: unknown) => {
    createToDoEntry(data as ToDoFormData)
      .then((data) => {
        console.log("ToDo Entry Created", data);
      })
      .catch((e) => {
        console.warn(e);
      });
  };
  return (
    <div className={styles.container}>
      <h1>TickIt</h1>
      <ToDoForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewToDoPage;
