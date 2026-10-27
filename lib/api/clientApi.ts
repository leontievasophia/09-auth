import type { Note, NewNote } from "@/types/note";
import { nextServer } from "./api";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  searchText?: string,
  tag?: string,
): Promise<NotesResponse> => {
  const response = await nextServer.get<NotesResponse>("/notes", {
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
  const response = await nextServer.post<Note>("/notes", newNote);

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);

  return response.data;
};
