"use client";
import css from "./NoteDetails.module.css";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Could not fetch note details.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.card}>
        <h1 className={css.title}>{note.title}</h1>
        <p className={css.content}>{note.content}</p>
        <span className={css.tag}>{note.tag}</span>
      </div>
    </div>
  );
}
