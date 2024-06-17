import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <>
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{props.note.title}</h5>
            <p className="card-text">{props.note.description}</p>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {
              updateNote(note);
            }}></i>
            <i className="fa-solid fa-trash mx-2" onClick={() => {
              deleteNote(note._id); props.showAlert("Deleted Note Successfully", "success");
            }}></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
