import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";

describe("HomePage", () => {
  test("renders NewToDoLoader", () => {
    render(<HomePage />);
    const newToDoLoaderElement = screen.getByTestId("new-todo");
    waitFor(() => {
      expect(newToDoLoaderElement).toBeInTheDocument();
    });
  });

  test("renders ToDoGridLoader", () => {
    render(<HomePage />);
    const toDoGridLoaderElement = screen.getByTestId("todo-grid");
    waitFor(() => {
      expect(toDoGridLoaderElement).toBeInTheDocument();
    });
  });

  test("renders background image", () => {
    render(<HomePage />);
    const bgImageElement = screen.getByAltText("background");
    waitFor(() => {
      expect(bgImageElement).toBeInTheDocument();
      expect(bgImageElement).toHaveAttribute("src", "monochrome.png");
    });
  });

  test("renders copyright text", () => {
    render(<HomePage />);
    const copyrightElement = screen.getByText("© / 2024");
    expect(copyrightElement).toBeInTheDocument();
  });
});
