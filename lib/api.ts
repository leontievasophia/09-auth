import axios from "axios";
import type { Note, NewNote } from "@/types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const fetchNotes = async (
  page: number,
  searchText?: string,
  tag?: string,
): Promise<NotesResponse> => {
  const response = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: searchText,
      tag: tag === "all" ? undefined : tag,
    },
  });

  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await api.post<Note>("/notes", newNote);

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);

  return response.data;
};
