import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToDoForm from "./ToDoForm";

describe("ToDoForm", () => {
  const onSubmit = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders input fields and submit button", () => {
    render(<ToDoForm onSubmit={onSubmit} />);
    expect(
      screen.getByPlaceholderText("Type title here...")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Type content here...")
    ).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<ToDoForm onSubmit={onSubmit} />);
    const titleInput = screen.getByPlaceholderText("Type title here...");
    const contentInput = screen.getByPlaceholderText("Type content here...");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentInput, { target: { value: "Test Content" } });

    const createButton = screen.getByText("Create");
    await userEvent.click(createButton);

    waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: "Test Title",
        content: "Test Content",
      });
    });
  });

  it("does not submit the form with invalid data", async () => {
    render(<ToDoForm onSubmit={onSubmit} />);
    const titleInput = screen.getByPlaceholderText("Type title here...");
    const contentInput = screen.getByPlaceholderText("Type content here...");

    fireEvent.change(titleInput, { target: { value: "" } });
    fireEvent.change(contentInput, { target: { value: "Help me" } });
    const createButton = screen.getByText("Create");
    await userEvent.click(createButton);
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
