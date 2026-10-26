"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

import css from "@/app/notes/[id]/NoteDetails.module.css";

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

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
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.card}>
          <h1 className={css.title}>{note.title}</h1>
          <p className={css.content}>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>
          <p>Created: {new Date(note.createdAt).toLocaleDateString("uk-UA")}</p>
        </div>
      </div>
    </Modal>
  );
}
