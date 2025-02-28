import React, { useState } from "react";
import NotesContext from "./NotesContext";

const NotesState = (props) => {
  const host = "http://localhost:5000";
  const notesInitials = [];
  const [notes, setNotes] = useState(notesInitials)
  //Get all notes
  const getNotes = async () => {
    //Fetch API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      }
    });
    const json = await response.json();
    setNotes(json);
  }
  //Add Note
  const addNote = async (title, description, tag) => {
    //Fetch API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token'), },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  }
  //Delete Note
  // const deleteNote= async(id)=>{
  //   //Fetch API call
  //   const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
  //     method:'DELETE',
  //     headers:{'Content-Type':'application/json','auth-token':localStorage.getItem('token'),}
  //   });
  //   const json = await response.json();

  //   const newNotes = notes.filter((note)=>{return note._id !== id});
  //   setNotes(newNotes);
  // }
  // Delete Note
  const deleteNote = async (id) => {
    try {
      // Fetch API call to delete the note
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        }
      });

      // Check if the response was successful
      if (!response.ok) {
        console.error('Failed to delete note');
        return;
      }

      const json = await response.json();
      console.log(json);
      // Log the server response for debugging
      // Update the state by filtering out the deleted note
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);

    } catch (error) {
      console.error('Error while deleting note:', error);
    }
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //Fetch API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token'), },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <NotesContext.Provider value={{ notes, editNote, deleteNote, addNote, getNotes }}>
      {props.children}
    </NotesContext.Provider>
  );
}

export default NotesState;