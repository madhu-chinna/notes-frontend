import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch all notes
  useEffect(() => {
    fetchNotes();
  },[]);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3008/notes');
      const data = await response.json();
      // console.log('Fetched Notes:', data); // Debug log
      setNotes(data);
      setFilteredNotes(data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  const handleSaveNote = async (note) => {
    try {
      if (note.id) {
        // Update note
        // console.log('coming to handle save Note ...')
        const response = await fetch(`http://localhost:3008/notes/${note.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note),
        });

        if (response.ok) {
          const updatedNote = await response.json();
          // console.log('Updated Note:', updatedNote); // Debug log
          const updatedNotes = notes.map((n) =>
            n.id === updatedNote.id ? updatedNote : n
          );
          setNotes(updatedNotes);
          setFilteredNotes(updatedNotes);
          setSelectedNote(null);
        }
      } else {
        // Add note
        const response = await fetch('http://localhost:3008/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note),
        });

        if (response.ok) {
          const newNote = await response.json();
          // console.log('New Note:', newNote); // Debug log
          const updatedNotes = [newNote, ...notes];
          setNotes(updatedNotes);
          setFilteredNotes(updatedNotes);
        }
      }
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:3008/notes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        setFilteredNotes(updatedNotes);
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  // Handle search and filter
  const handleSearch = (term) => {
    console.log("came to handle search--- ")
    console.log("term-- ", term)
    setSearch(term);
    if (term) {
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(term.toLowerCase()) ||
            note.category.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredNotes(notes);
    }
  };

  // Debug logs for state updates
  useEffect(() => {
    console.log('Notes updated:', notes);
    console.log('Filtered Notes updated:', filteredNotes);
  }, [notes, filteredNotes]);
  console.log(selectedNote)
  return (
    <div className="app">
      <h1>Personal Notes Manager</h1>
      <SearchBar search={search} onSearch={handleSearch} />
      <NoteForm onSave={handleSaveNote} note={selectedNote} />
      <NoteList
        notes={filteredNotes}
        onEdit={setSelectedNote}
        onDelete={handleDeleteNote}
      />
    </div>
  );
};

export default App;
