import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import {  useNavigate } from "react-router-dom";


const Home = () => {
  const Navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:3001/createNote", {
        title,
        description
      }, {
        headers: { 'x-api-key': localStorage.getItem('token') }
      });

      setNotes((prevNotes) => [...prevNotes, data.data.note]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error('Note Not created:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:3001/deleteNote/${noteId}`, {
        headers: { 'x-api-key': localStorage.getItem('token') }
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = (noteId) => {
    setEditNoteId(noteId);
    const noteToEdit = notes.find((note) => note._id === noteId);
    setEditedTitle(noteToEdit.title);
    setEditedDescription(noteToEdit.description);
  };

  const handleSaveEdit = async (noteId) => {
    try {
      const editedNote = {
        title: editedTitle,
        description: editedDescription,
      };
      await axios.put(`http://localhost:3001/updateNotes/${noteId}`, editedNote, {
        headers: { 'x-api-key': localStorage.getItem('token') }
      });
      setEditNoteId(null);
      const updatedNotes = await fetchNotes();
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:3001/getNotes", {
        headers: { 'x-api-key': token }
      });
      return response.data.notes;
    } catch (error) {
      console.error('Error fetching notes:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchNotes().then((fetchedNotes) => {
      setNotes(fetchedNotes);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    Navigate('/Login');
  };
  

  return (
    <div className={`bg-${darkMode ? 'gray-800' : 'gray-100'} min-h-screen p-4 text-${darkMode ? 'white' : 'black'}`}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} handleLogout={handleLogout} />
      <div className="container mx-auto flex flex-wrap pt-16">
        <div className="w-full md:w-1/4 p-4 bg-white rounded-md shadow-md md:mr-4 mb-4">
          <h1 className="text-2xl font-semibold mb-4">Create Note</h1>
          <form className="note-form" onSubmit={handleSubmit}>
            <input
              className="w-full p-2 mb-2 border rounded"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="w-full p-2 h-32 border rounded"
              placeholder="Content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-2 w-full"
            >
              Create Note
            </button>
          </form>
        </div>
        <div className="w-full md:w-3/4">
          <div className="flex flex-wrap">
            {notes.map((note) => (
              <div key={note._id} className="w-full md:w-1/3 p-4">
                <div className="bg-white rounded-md shadow-md mb-4 p-4">
                  {editNoteId === note._id ? (
                    <div>
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                      <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                      />
                      <button
                        onClick={() => handleSaveEdit(note._id)}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-2"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-lg font-semibold text-blue-500">{note.title}</h2>
                      <p className="text-gray-600 overflow-hidden line-clamp-3">
                        {note.description}
                      </p>
                      <button
                        onClick={() => handleEdit(note._id)}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNote(note._id)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 mt-2"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
