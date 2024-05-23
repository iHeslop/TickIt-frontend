import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ToDoCard from "./ToDoCard";
import { ToDoEntryResponse } from "../../services/api-responses.interface";

describe("ToDoCard", () => {
  const mockToDoEntry: ToDoEntryResponse = {
    id: 1,
    title: "Test ToDo",
    content: "Test Content",
    completed: false,
    createdAt: "2024-05-23",
    updatedAt: "2024-05-23",
  };

  const onDelete = vi.fn();
  const onSubmit = vi.fn();
  const onStatusChange = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the ToDo entry", () => {
    render(
      <ToDoCard
        toDoEntry={mockToDoEntry}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onStatusChange={onStatusChange}
      />
    );
    expect(screen.getByText("Test ToDo")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked and confirmed", async () => {
    const onDelete = vi.fn();
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValueOnce(true);

    render(
      <ToDoCard
        toDoEntry={mockToDoEntry}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onStatusChange={onStatusChange}
      />
    );
    const deleteButton = screen.getByAltText("delete");
    const user = userEvent.setup();
    await user.click(deleteButton);

    expect(confirmSpy).toHaveBeenCalledWith("Delete Entry?");
    expect(onDelete).toHaveBeenCalledWith(mockToDoEntry.id);
  });

  it("does not call onDelete when delete button is clicked and not confirmed", async () => {
    const onDelete = vi.fn();
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValueOnce(false);

    render(
      <ToDoCard
        toDoEntry={mockToDoEntry}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onStatusChange={onStatusChange}
      />
    );
    const deleteButton = screen.getByAltText("delete");
    const user = userEvent.setup();
    await user.click(deleteButton);

    expect(confirmSpy).toHaveBeenCalledWith("Delete Entry?");
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("toggles edit mode when edit button is clicked", async () => {
    render(
      <ToDoCard
        toDoEntry={mockToDoEntry}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onStatusChange={onStatusChange}
      />
    );
    const editButton = screen.getByAltText("edit");
    const user = userEvent.setup();
    await user.click(editButton);

    expect(screen.getByTestId("titleInput")).toBeInTheDocument();
    expect(screen.getByTestId("contentInput")).toBeInTheDocument();
  });

  it("calls onSubmit when the form is submitted in edit mode", async () => {
    const onSubmit = vi.fn();

    render(
      <ToDoCard
        toDoEntry={mockToDoEntry}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onStatusChange={onStatusChange}
      />
    );
    const editButton = screen.getByAltText("edit");
    const user = userEvent.setup();
    await user.click(editButton);

    const titleInput = screen.getByTestId("titleInput");
    const contentInput = screen.getByTestId("contentInput");
    const tickButton = screen.getByAltText("tick");

    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    fireEvent.change(contentInput, { target: { value: "Updated Content" } });
    await user.click(tickButton);

    waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        ...mockToDoEntry,
        title: "Updated Title",
        content: "Updated Content",
      });
    });
  });

  it("calls onStatusChange and updates status when tick image is clicked", async () => {
    const onStatusChange = vi.fn();

    render(
      <ToDoCard
        toDoEntry={mockToDoEntry}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onStatusChange={onStatusChange}
      />
    );
    const tickButton = screen.getByAltText("open");
    const user = userEvent.setup();
    await user.click(tickButton);

    waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledWith(1, mockToDoEntry);
    });
  });
});
