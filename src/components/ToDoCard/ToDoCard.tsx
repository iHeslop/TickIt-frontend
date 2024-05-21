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
import open from "../../assets/open-checkbox.png";
import ticked from "../../assets/ticked-checkbox.png";
import { updateToDoEntryById } from "../../services/todo-services";

interface ToDoEntryCardProps {
  toDoEntry: ToDoEntryResponse;
  onDelete: (id: number) => void;
  onSubmit: (id: number, data: any) => void;
  onStatusChange: (id: number, completed: boolean) => void;
}

const ToDoCard = ({
  toDoEntry,
  onDelete,
  onSubmit,
  onStatusChange,
}: ToDoEntryCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isTicked, setIsTicked] = useState(toDoEntry.completed);
  const { handleSubmit, register } = useForm({ resolver: zodResolver(schema) });

  const handleDelete = () => {
    if (window.confirm("Delete Entry?") === true) {
      onDelete(toDoEntry.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleTick = async () => {
    const confirmation = isTicked
      ? window.confirm("Mark entry as incomplete?")
      : window.confirm("Mark entry as completed?");

    if (confirmation) {
      try {
        await updateToDoEntryById(toDoEntry.id, {
          title: toDoEntry.title,
          content: toDoEntry.content,
          completed: !isTicked,
        });
        setIsTicked(!isTicked);
        onStatusChange(toDoEntry.id, !isTicked);
      } catch (error) {
        console.error("Failed to update entry:", error);
        setIsTicked(!isTicked);
      }
    } else {
      setIsTicked(!isTicked);
      onStatusChange(toDoEntry.id, !isTicked);
    }
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
          {!isTicked && (
            <div className={styles.tick}>
              <img
                src={open}
                alt="open"
                onClick={handleTick}
                className={styles.image}
              />
            </div>
          )}
          {isTicked && (
            <div className={styles.tick}>
              <img
                src={ticked}
                alt="ticked"
                onClick={handleTick}
                className={styles.image}
              />
            </div>
          )}
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
          {!isTicked && (
            <div className={styles.tick}>
              <img
                src={open}
                alt="open"
                onClick={handleTick}
                className={styles.image}
              />
            </div>
          )}
          {isTicked && (
            <div className={styles.tick}>
              <img
                src={ticked}
                alt="ticked"
                onClick={handleTick}
                className={styles.image}
              />
            </div>
          )}
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
