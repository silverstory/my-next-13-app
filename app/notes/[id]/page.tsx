import styles from "../Notes.module.css";
import invariant from "tiny-invariant";
import { marked } from "marked";

type Note = {
  id: string;
  title: string;
  content: string;
  markdown: string;
  created: string;
  updated: string;
};

async function getNote(noteId: string): Promise<Note> {
  // use static generation if you want to load
  // data that doesn't change in the future.
  // it will pre-render pages that uses the data
  // https://youtu.be/__mSgDEOyv8?t=387

  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
    { next: { revalidate: 10 } }
  );
  const data = await res.json();

  return data as Note;
}

// Quick note on that invariant for the params.
// Because params comes from the URL, we can't be totally sure
// that params.id will be defined.
// --maybe you change the name of the folder
// to [noteid]! It's good practice to validate that
// stuff with invariant, and it makes TypeScript happy too.
// We also have an invariant for the note. We'll handle the 404 case.
export default async function NotePage({ params }: any) {
  invariant(params.id, `params.id is required`);

  const note: Note = await getNote(params.id);
  invariant(note, `Note not found: ${params.id}`);

  const html = marked(note.markdown);

  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <p>{note.created}</p>
      </div>
    </div>
  );
}
