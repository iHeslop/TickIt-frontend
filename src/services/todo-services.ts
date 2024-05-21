import { ToDoFormData } from "../components/ToDoForm/schema";
import { baseUrl } from "./api-config";
import { ToDoEntryResponse } from "./api-responses.interface";

export const getAllToDoEntries = async (): Promise<ToDoEntryResponse[]> => {
  const response = await fetch(baseUrl + "/entries");
  if (!response.ok) {
    throw new Error("Failed to fetch entries");
  }
  return await response.json();
};

export const getToDoEntryById = async (
  id: number
): Promise<ToDoEntryResponse> => {
  const response = await fetch(`${baseUrl}/entries/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch entry");
  }
  return await response.json();
};

export const createToDoEntry = async (
  data: ToDoFormData
): Promise<ToDoEntryResponse> => {
  const response = await fetch(baseUrl + "/entries", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to add entry");
  }
  return await response.json();
};

export const updateToDoEntryById = async (
  id: number,
  data: ToDoFormData
): Promise<ToDoEntryResponse> => {
  const response = await fetch(`${baseUrl}/entries/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update entry");
  }
  return await response.json();
};

export const deleteToDoEntryById = async (id: number): Promise<void> => {
  const response = await fetch(`${baseUrl}/entries/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete entry");
  }
};
