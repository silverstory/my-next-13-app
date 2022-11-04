// if you are gonna use pocketbase's data library
// import PocketBase from 'pocketbase';
import Link from "next/link";
import styles from "./Notes.module.css";
import CreateNote from "./CreateNote";
import { marked } from "marked";
import Delete from "./Delete";

// if you are gonna use pocketbase's data library
// export const dynamic = 'auto',
//   dynamicParams = true,
//   revalidate = 0,
//   fetchCache = 'auto',
//   runtime = 'nodejs',
//   preferredRegion = 'auto'

type Note = {
  id: string;
  title: string;
  content: string;
  markdown: string;
  created: string;
  updated: string;
};

async function getNotes(): Promise<Array<Note>> {
  // if you are gonna use pocketbase's data library
  // const db = new PocketBase('http://127.0.0.1:8090');
  // const result = await db.records.getList('notes');

  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30",
    { cache: "no-store" }
  );
  const data = await res.json();

  return data?.items as Note[];
}

export default async function NotesPage() {
  const notes: Array<Note> = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note: Note) => {
          return (
            <div key={note.id}>
              <Note key={note.id} note={note} />
              <Delete key={note.id} note={note} />
            </div>
          );
        })}
      </div>

      <CreateNote />
    </div>
  );
}

// function Note({ note }: any) {
function Note({ note }: any) {
  const { id, title, content, markdown, created, updated } = note || {};
  const html = marked(markdown);
  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <p>{created}</p>
        <p>{updated}</p>
      </div>
    </Link>
  );
}
