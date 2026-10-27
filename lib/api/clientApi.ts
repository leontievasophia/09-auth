import type { Note, NewNote } from "@/types/note";
import { nextServer } from "./api";
import type { User } from "@/types/user";
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

interface RegisterRequest {
  email: string;
  password: string;
}

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await nextServer.post<User>("/auth/register", data);

  return response.data;
};

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (data: LoginRequest): Promise<User> => {
  const response = await nextServer.post<User>("/auth/login", data);

  return response.data;
};

export const checkSession = async (): Promise<boolean> => {
  const response = await nextServer.get("/auth/session");

  return response.status === 200;
};

export const getMe = async (): Promise<User> => {
  const response = await nextServer.get<User>("/users/me");

  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

interface UpdateUserRequest {
  username: string;
}

export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
  const response = await nextServer.patch<User>("/users/me", data);

  return response.data;
};
