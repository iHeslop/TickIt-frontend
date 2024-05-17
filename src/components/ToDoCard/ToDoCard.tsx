import { ToDoEntryResponse } from "../../services/api-responses.interface";

interface ToDoEntryCardProps {
  toDoEntry: ToDoEntryResponse;
}

const ToDoCard = ({ toDoEntry }: ToDoEntryCardProps) => {
  return (
    <div>
      <h2>{toDoEntry.title}</h2>
      <p>{toDoEntry.content}</p>
    </div>
  );
};

export default ToDoCard;
