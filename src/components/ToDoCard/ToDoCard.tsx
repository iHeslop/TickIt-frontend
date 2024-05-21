import { ToDoEntryResponse } from "../../services/api-responses.interface";
import deleteImage from "../../assets/delete.png";
import editImage from "../../assets/edit.png";
import tickImage from "../../assets/tick.png";
import closeImage from "../../assets/close.png";
import styles from "./ToDoCard.module.scss";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../ToDoForm/schema";

interface ToDoEntryCardProps {
  toDoEntry: ToDoEntryResponse;
  onDelete: (id: number) => void;
  onSubmit: (id: number, data: any) => void;
}

const ToDoCard = ({ toDoEntry, onDelete, onSubmit }: ToDoEntryCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { handleSubmit, register } = useForm({ resolver: zodResolver(schema) });

  const handleDelete = () => {
    onDelete(toDoEntry.id);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(toDoEntry.id, data);
    setIsEditing(false);
  };

  const updatedAtDate: Date = new Date(toDoEntry.updatedAt);
  const month: string = (updatedAtDate.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const day: string = updatedAtDate.getDate().toString().padStart(2, "0");
  const monthDay: string = `${day} / ${month} `;

  return (
    <div className={styles.container}>
      {!isEditing && (
        <>
          <div className={styles.text}>
            <h2 className={styles.text_title}>{toDoEntry.title}</h2>
            <p className={styles.text_content}>{toDoEntry.content}</p>
            <p className={styles.text_date}>Last Updated: {monthDay}</p>
          </div>
          <div className={styles.box}>
            <img
              src={editImage}
              alt="edit"
              onClick={handleEdit}
              className={styles.image}
            />
            <img
              src={deleteImage}
              alt="delete"
              onClick={handleDelete}
              className={styles.image_checks}
            />
          </div>
        </>
      )}
      {isEditing && (
        <>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className={styles.text}
          >
            <div className={styles.inputBox}>
              <input
                className={styles.text_title}
                id="titleInput"
                type="text"
                defaultValue={toDoEntry.title}
                {...register("title")}
              />
            </div>
            <div className={styles.inputBox}>
              <input
                className={styles.text_content}
                id="contentInput"
                type="text"
                defaultValue={toDoEntry.content}
                {...register("content")}
              />
            </div>

            <p className={styles.text_date}>Last Updated: {monthDay}</p>
            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </form>
          <div className={styles.box}>
            <img
              src={tickImage}
              alt="tick"
              onClick={handleSubmit(handleFormSubmit)}
              className={styles.image_checks}
            />
            <img
              src={closeImage}
              alt="close"
              onClick={handleEdit}
              className={styles.image_checks}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ToDoCard;
