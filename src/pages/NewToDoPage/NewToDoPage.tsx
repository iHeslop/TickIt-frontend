import { useNavigate } from "react-router-dom";
import { createToDoEntry } from "../../services/todo-services";
import { ToDoFormData } from "../../components/ToDoForm/schema";
import ToDoForm from "../../components/ToDoForm/ToDoForm";

const NewToDoPage = () => {
  const navigate = useNavigate();
  const onSubmit = (data: unknown) => {
    createToDoEntry(data as ToDoFormData)
      .then((data) => {
        console.log("ToDo Entry Created", data);
        navigate("/");
      })
      .catch((e) => {
        console.warn(e);
      });
  };
  return (
    <>
      <div>
        <h1>Create a new To Do Entry</h1>
        <ToDoForm onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default NewToDoPage;
