import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  let notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/findAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1OTkyMTZlMzdiZThjN2I5M2E5MmVmIn0sImlhdCI6MTcxNzE0NjIxMH0.JKcO9Nk3a2Z22mq5U1qecqhuICV4kGReMKaTCxNAAF0",
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1OTkyMTZlMzdiZThjN2I5M2E5MmVmIn0sImlhdCI6MTcxNzE0NjIxMH0.JKcO9Nk3a2Z22mq5U1qecqhuICV4kGReMKaTCxNAAF0",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1OTkyMTZlMzdiZThjN2I5M2E5MmVmIn0sImlhdCI6MTcxNzE0NjIxMH0.JKcO9Nk3a2Z22mq5U1qecqhuICV4kGReMKaTCxNAAF0",
      },
    });

    const json = response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1OTkyMTZlMzdiZThjN2I5M2E5MmVmIn0sImlhdCI6MTcxNzE0NjIxMH0.JKcO9Nk3a2Z22mq5U1qecqhuICV4kGReMKaTCxNAAF0",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;

        break
      }
    }

    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
