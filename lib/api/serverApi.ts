import "server-only";

import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import { nextServer } from "./api";
import type { NotesResponse } from "./clientApi";

export const fetchNotes = async (
  page: number,
  searchText?: string,
  tag?: string,
): Promise<NotesResponse> => {
  const cookieStore = await cookies();

  const response = await nextServer.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: searchText,
      tag: tag === "all" ? undefined : tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};
