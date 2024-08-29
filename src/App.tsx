import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import InputModal from "./components/InputModal";
import { useNotes } from "./hooks/useNotes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NoteProps } from "./types/note";

const Home : React.FC  = () => {

  const { notes, loading } = useNotes();
  const [newNotes, setNewNotes] = useState(notes);

  useEffect(() => {
    setNewNotes(notes);
  }, [notes]);

  const handleNoteSave = (addedNote : NoteProps) => {
    setNewNotes((prevNotes) => [...prevNotes, addedNote]);
  } 
  // const res = await fetch(`${process.env.PUBLIC_URL}/notes.json`);
  // const data = await res.json();
  // const notes : NoteProps[] = data.notes;

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col bg-gray-50 md:p-20 p-5">


        <div className="flex flex-row justify-center items-center md:p-10 md:gap-3 sm:p-5 sm:gap-2 bg-purple-600 border-2 border-purple-950 rounded-2xl">
          <div className="p-2 mr-2">
            <img src="/icons/icons-192.png" alt="Actif Notes Logo" height={100} width={100} />
          </div>
          <div className="flex flex-col text-lg p-2 text-white font-bold">
            <p className="text-3xl font-bold">Actif Notes</p>
            <p className="md:text-lg text-sm font-normal">Progressive web application for note-taking</p>
          </div>
        </div>

        <div className="flex flex-row gap-5 items-center justify-center my-5">
          <div className="md:px-10 mr-12">{newNotes.length} notes recorded</div>
          <div>
            <InputModal 
              onNoteSave={handleNoteSave}
            />
          </div>
        </div>

        <div className="flex flex-col my-8">
          <p className="text-lg font-bold">Notes</p>

          <div className="my-5">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="loader">Loading...</div>
              </div>
            ) : newNotes.length === 0 ? (
              <div className="text-center text-gray-600">
                <p>No notes available. Add a new note to get started!</p>
              </div>
            ) : (
              newNotes.map((note, index) => (
                <Note
                  title={note.title}
                  summary={note.summary}
                  body={note.body}
                  timestamp={new Date(note.timestamp)}
                  key={index}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;