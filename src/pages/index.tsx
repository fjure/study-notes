import { type NextPage } from "next";
import Head from "next/head";

import { trpc } from "../utils/trpc";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import type { Note as NoteModel } from "@prisma/client";
import Notes from "../components/Notes";

const Home: NextPage = () => {
  const { data } = trpc.noteRouter.getAllNotes.useQuery();
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    if (data) setNotes(data);
  }, [data]);

  return (
    <div>
      <Head>
        <title>Study Notes</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <main>
        <Layout>
          <Notes notes={notes} setNotes={setNotes} />
        </Layout>
      </main>
    </div>
  );
};

export default Home;