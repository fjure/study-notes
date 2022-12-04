import type { Note as NoteModel } from "@prisma/client";
import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import React from "react";
import Note from "./Note";

interface NotesProps {
  notes: NoteModel[];
  setNotes: Dispatch<SetStateAction<NoteModel[]>>;
}

const Notes: FC<NotesProps> = (props) => {
  const { notes, setNotes } = props;
  const [selectedNote, setSelectedNote] = useState<NoteModel>();

  const handleSelect = (note: NoteModel) => {
    setSelectedNote(note);
  };

  return (
    <div className="flex flex-col gap-y-2 border px-4">
      {notes?.map((note) => (
        <div
          key={note.id}
          onClick={() => handleSelect(note)}
          className={`flex-auto rounded-lg border bg-white ${
            note.id === selectedNote?.id ? "border-red-500" : ""
          }`}
        >
          <Note
            note={note}
            setNotes={setNotes}
            selected={note.id === selectedNote?.id}
          />
        </div>
      ))}
    </div>
  );
};

export default Notes;
