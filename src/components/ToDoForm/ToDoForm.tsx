import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import styles from "./ToDoForm.module.scss";

interface ToDoFormProps {
  onSubmit: (data: unknown) => unknown;
}

const ToDoForm = ({ onSubmit }: ToDoFormProps) => {
  const { handleSubmit, register, reset } = useForm({
    resolver: zodResolver(schema),
  });
  const handleFormSubmit = (data: unknown) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.main}>
      <div className={styles.container}>
        <div className={styles.box}>
          <input
            className={styles.textInput}
            id="titleInput"
            type="text"
            {...register("title")}
            placeholder="Type title here..."
          />
        </div>
        <div className={styles.box}>
          <input
            className={styles.textInput}
            id="contentInput"
            type="text"
            {...register("content")}
            placeholder="Type content here..."
          />
        </div>
      </div>
      <div className={styles.btnBox}>
        <button className={styles.btnBox_btn} type="submit">
          Create
        </button>
      </div>
    </form>
  );
};

export default ToDoForm;
