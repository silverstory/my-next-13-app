"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PocketBase from 'pocketbase';

type Note = {
  id: string;
  title: string;
  content: string;
  markdown: string;
  created: string;
  updated: string;
};

export default function Delete({ note }: any) {
  const { id, title, content, markdown, created, updated } = note || {};

  const [ noteid, setNoteid ] = useState(id);

  const router = useRouter();

  const deleteNote = async (e) => {

    e.preventDefault();

    const pb = new PocketBase('http://127.0.0.1:8090');

    // const router = useRouter();

    // await fetch(`http://127.0.0.1:8090/api/collections/notes/${id}`, {
    //   method: "DELETE",
    // });

    console.log(noteid);

    await pb.records.delete('notes', id);
  
    router.refresh();

  } 

  return (
    <button onClick={deleteNote}>Delete note</button>
  );
}
