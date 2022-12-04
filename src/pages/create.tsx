import type { NextPage } from "next";
import Router from "next/router";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";

const CreateNote: NextPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate: addNote } = trpc.noteRouter.addNote.useMutation();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleCancelButton = () => {
    Router.push("/");
  };

  const submitData = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNote({ title: title, content: content });
    Router.push("/").then(() => Router.reload());
  };

  return (
    <Layout>
      <form onSubmit={submitData}>
        <div className="flex flex-col items-center justify-center space-y-4 bg-stone-200 p-4">
          <h1 className="text-2xl font-bold">New note</h1>
          <input
            type="text"
            autoFocus
            onChange={handleTitleChange}
            placeholder="Title"
            value={title}
            className="w-full rounded-md border border-stone-500 p-4"
          />
          <textarea
            cols={50}
            onChange={handleContentChange}
            placeholder="Content"
            rows={8}
            value={content}
            className="w-full rounded-md border border-stone-500 p-4"
          />
          <button
            disabled={!content || !title}
            type="submit"
            value="Create"
            className="rounded-md border border-stone-500 p-2 text-gray-500"
          >
            Create
          </button>
          <a
            className="cursor-pointer rounded-md border border-stone-500 p-2"
            onClick={handleCancelButton}
          >
            Cancel
          </a>
        </div>
      </form>
    </Layout>
  );
};

export default CreateNote;
