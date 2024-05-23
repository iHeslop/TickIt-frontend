import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getAllToDoEntries,
  getToDoEntryById,
  createToDoEntry,
  updateToDoEntryById,
  deleteToDoEntryById,
} from "./todo-services";
import { ToDoFormData } from "../components/ToDoForm/schema";
import { ToDoEntryResponse } from "./api-responses.interface";

describe("todo-services", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("getAllToDoEntries", () => {
    it("should return a response if fetch is successful", async () => {
      const mockResponse: ToDoEntryResponse[] = [
        {
          id: 1,
          title: "Test ToDo",
          content: "Test Description",
          createdAt: "2024-05-21 14:12:55.346000",
          updatedAt: "2024-05-21 14:12:55.346000",
          completed: false,
        },
      ];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getAllToDoEntries();
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if fetch fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(getAllToDoEntries()).rejects.toThrow(
        "Failed to fetch entries"
      );
    });
  });

  describe("getToDoEntryById", () => {
    it("should return a response if fetch is successful", async () => {
      const mockResponse: ToDoEntryResponse = {
        id: 1,
        title: "Test ToDo",
        content: "Test Description",
        createdAt: "2024-05-21 14:12:55.346000",
        updatedAt: "2024-05-21 14:12:55.346000",
        completed: false,
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getToDoEntryById(1);
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if fetch fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(getToDoEntryById(1)).rejects.toThrow(
        "Failed to fetch entry"
      );
    });
  });

  describe("createToDoEntry", () => {
    it("should return a response if fetch is successful", async () => {
      const mockResponse: ToDoEntryResponse = {
        id: 1,
        title: "Test ToDo",
        content: "Test Description",
        createdAt: "2024-05-21 14:12:55.346000",
        updatedAt: "2024-05-21 14:12:55.346000",
        completed: false,
      };
      const data: ToDoFormData = {
        title: "Test ToDo",
        content: "Test Description",
        completed: false,
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await createToDoEntry(data);
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if fetch fails", async () => {
      const data: ToDoFormData = {
        title: "Test ToDo",
        content: "Test Description",
        completed: false,
      };
      mockFetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(createToDoEntry(data)).rejects.toThrow(
        "Failed to add entry"
      );
    });
  });

  describe("updateToDoEntryById", () => {
    it("should return a response if fetch is successful", async () => {
      const mockResponse: ToDoEntryResponse = {
        id: 1,
        title: "Updated ToDo",
        content: "Updated Description",
        createdAt: "2024-05-21 14:12:55.346000",
        updatedAt: "2024-05-21 14:12:55.346000",
        completed: false,
      };
      const data: ToDoFormData = {
        title: "Updated ToDo",
        content: "Updated Description",
        completed: false,
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await updateToDoEntryById(1, data);
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if fetch fails", async () => {
      const data: ToDoFormData = {
        title: "Updated ToDo",
        content: "Updated Description",
        completed: false,
      };
      mockFetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(updateToDoEntryById(1, data)).rejects.toThrow(
        "Failed to update entry"
      );
    });
  });

  describe("deleteToDoEntryById", () => {
    it("should not throw an error if fetch is successful", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
      });

      await expect(deleteToDoEntryById(1)).resolves.not.toThrow();
    });

    it("should throw an error if fetch fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(deleteToDoEntryById(1)).rejects.toThrow(
        "Failed to delete entry"
      );
    });
  });
});
