import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ToDoGridLoader from "./ToDoGridLoader";
import { vi } from "vitest";

const getAllToDoEntries = vi.fn();
const deleteToDoEntryById = vi.fn();
const updateToDoEntryById = vi.fn();

describe("ToDoGridLoader Component", () => {
  const mockEntries = [
    { id: 1, title: "Task 1", content: "Some content", completed: false },
    { id: 2, title: "Task 2", content: "Some more content", completed: true },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("renders the loader when fetching data", async () => {
    render(<ToDoGridLoader />);

    expect(screen.getByText("...LOADING...")).toBeInTheDocument();
    expect(screen.queryByText("...FAILED TO LOAD...")).not.toBeInTheDocument();

    waitFor(() =>
      expect(screen.queryByText("...LOADING...")).not.toBeInTheDocument()
    );
  });

  test("renders the failed message when fetch fails", async () => {
    getAllToDoEntries.mockRejectedValueOnce(new Error("Failed to fetch data"));
    render(<ToDoGridLoader />);

    waitFor(() =>
      expect(screen.getByText("...FAILED TO LOAD...")).toBeInTheDocument()
    );
  });

  test("renders entries properly", async () => {
    getAllToDoEntries.mockResolvedValueOnce(mockEntries);
    render(<ToDoGridLoader />);

    waitFor(() => {
      expect(screen.queryByText("...LOADING...")).not.toBeInTheDocument();
      expect(
        screen.queryByText("...FAILED TO LOAD...")
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("todo-grid")).toBeInTheDocument();
      expect(screen.getByText("Incomplete")).toBeInTheDocument();
      expect(screen.getByText("Completed")).toBeInTheDocument();
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });
  });

  test("deletes an entry on delete button click", async () => {
    getAllToDoEntries.mockResolvedValueOnce(mockEntries);
    render(<ToDoGridLoader />);

    waitFor(() => {
      fireEvent.click(screen.getByTestId("delete"));
      expect(deleteToDoEntryById).toHaveBeenCalledWith(1);
      expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    });
  });

  test("updates an entry on form submit", async () => {
    getAllToDoEntries.mockResolvedValueOnce(mockEntries);
    render(<ToDoGridLoader />);

    waitFor(() => {
      fireEvent.change(screen.getByTestId("titleInput"), {
        target: { value: "Updated Task" },
      });
      fireEvent.submit(screen.getByTestId("submit"));
      expect(updateToDoEntryById).toHaveBeenCalledWith(1, {
        title: "Updated Task",
        completed: false,
      });
      expect(screen.queryByText("Updated Task")).toBeInTheDocument();
    });
  });

  test("toggles between completed and incomplete view", async () => {
    getAllToDoEntries.mockResolvedValueOnce(mockEntries);
    render(<ToDoGridLoader />);

    fireEvent.click(screen.getByText("Completed"));

    waitFor(() => {
      expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Incomplete"));

    waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
    });
  });
});
