import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { EntriesContext } from "../../context/EntriesContextProvider";
import NewToDoPage from "./NewToDoLoader";
import { createToDoEntry } from "../../services/todo-services";
import { vi } from "vitest";

describe("NewToDoPage", () => {
  const onSubmit = vi.fn();
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders NewToDoPage correctly", () => {
    const { getByText } = render(<NewToDoPage />);
    expect(getByText("TickIt")).toBeInTheDocument();
  });

  it("calls createToDoEntry and updates entries context on form submission", async () => {
    render(
      <EntriesContext.Provider value={{ entries: [], setEntries: onSubmit }}>
        <NewToDoPage />
      </EntriesContext.Provider>
    );
    const form = screen.getByTestId("todo-form");
    fireEvent.submit(form);

    waitFor(() => {
      expect(createToDoEntry).toHaveBeenCalled();
      expect(onSubmit).toHaveBeenCalledWith([
        { id: 1, title: "Test ToDo", completed: false },
      ]);
    });
  });

  it("logs warning on form submission failure", async () => {
    const confirmSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const error = new Error("Failed to create ToDo entry");
    vi.mock("../../services/todo-services", () => ({
      createToDoEntry: async () => {
        throw error;
      },
    }));

    const { getByTestId } = render(<NewToDoPage />);

    fireEvent.submit(getByTestId("todo-form"));

    waitFor(() => {
      expect(confirmSpy).toHaveBeenCalledWith(error);
    });

    confirmSpy.mockRestore();
  });
});
