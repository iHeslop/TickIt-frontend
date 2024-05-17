import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import ToDoGridPage from "./pages/ToDoGridPage/ToDoGridPage";
import NewToDoPage from "./pages/NewToDoPage/NewToDoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/entries/new">Add New Entry</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<ToDoGridPage />} />
          <Route path="/entries/new" element={<NewToDoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
