import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "./schema";

interface ToDoFormProps {
  onSubmit: (data: unknown) => unknown;
}

const ToDoForm = ({ onSubmit }: ToDoFormProps) => {
  const { handleSubmit, register } = useForm({ resolver: zodResolver(schema) });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <label htmlFor="titleInput">Title</label>
          <input id="titleInput" type="text" {...register("title")} />
        </div>
        <div>
          <label htmlFor="contentInput">Content</label>
          <textarea id="contentInput" {...register("content")}></textarea>
        </div>
      </div>
      <div>
        <button type="submit">Create To Do Entry</button>
      </div>
    </form>
  );
};

export default ToDoForm;
