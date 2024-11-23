import React from 'react';
import './index.css';

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="note-list">
        {notes?notes.map((note) => (
        <div key={note.id} className="note-item">
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <span className="category">{note.category}</span>
          <div className="actions">
            <button onClick={() => onEdit(note)}>Edit</button>
            <button onClick={() => onDelete(note.id)}>Delete</button>
          </div>
        </div>
      )):<h1>Nothing to show</h1>}
      
    </div>
  );
};

export default NoteList;
