import { Note } from "@prisma/client";
import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import React, { useState } from "react";
import { MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";
import { trpc } from "../utils/trpc";

interface NoteProps {
  note: Note;
  setNotes: Dispatch<SetStateAction<Note[]>>;
  selected: boolean;
}

const Note: FC<NoteProps> = (props) => {
  const { note, setNotes, selected } = props;
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.content);

  const { mutate: deleteNote } = trpc.noteRouter.deleteNote.useMutation({
    onSuccess(note) {
      setNotes((prev) => prev.filter((response) => note.id !== response.id));
    },
  });

  const { mutate: updateNote } = trpc.noteRouter.updateNote.useMutation({
    onSuccess(note) {
      setNotes((prev) => {
        return prev.map((response) =>
          note.id !== response.id ? response : note
        );
      });
    },
  });

  const handleDelete = () => {
    if (note.userId) deleteNote({ userId: note.userId, noteId: note.id });
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    updateNote({ title: newTitle, content: newContent, noteId: note.id });
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(event.target.value);
  };

  return (
    <div className={`grid max-h-96 grid-cols-3 grid-rows-3 p-2 `}>
      <div className="col-span-2 col-start-1">
        {editMode && selected ? (
          <>
            <>
              <h1>Title:</h1>
              <input
                type="text"
                autoFocus
                onChange={handleTitleChange}
                placeholder={note.title}
                value={newTitle}
                className="w-full rounded-md border border-stone-500 p-2 text-sm"
              />
              <h1>Content:</h1>
              <textarea
                cols={10}
                onChange={handleContentChange}
                placeholder={note.content}
                rows={8}
                value={newContent}
                className="w-full rounded-md border border-stone-500 p-4"
              />
            </>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{note.title}</h1>
            <sub>Note ID: {note.id}</sub>
            <p className="mt-4">Content: {note.content}</p>
          </>
        )}
      </div>

      {selected && (
        <>
          {editMode ? (
            <>
              <div className="col-end-5 row-end-4 content-end">
                <button
                  type="button"
                  className="inline-flex h-10 items-center px-5"
                  onClick={handleSave}
                >
                  <MdSave />
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex h-10 items-center px-5"
                >
                  <MdCancel />
                  <span>Cancel</span>
                </button>
              </div>
            </>
          ) : (
            <div className="col-end-5 row-end-4 content-end">
              <button
                type="button"
                className="inline-flex h-10 items-center px-5"
                onClick={handleEdit}
              >
                <MdEdit />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex h-10 items-center px-5"
              >
                <MdDelete />
                <span>Delete</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Note;
