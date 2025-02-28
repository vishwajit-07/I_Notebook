import React, { useState, useContext, useEffect, useRef } from 'react';
import NoteItems from './NoteItems';
import AddNote from './AddNote';
import NotesContext from '../context/notes/NotesContext';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  const navigate = useNavigate();
  const context = useContext(NotesContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' })
  const refClose = useRef(null);

  const handleSubmit = () => {
    console.log("update note successfully!", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully","success");
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      console.error('No auth token found, redirecting to login');
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }
  const ref = useRef(null);
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      {/* <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={ref}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="note" className="form-label">
                    Note
                  </label>
                  <input
                    value={note.etitle}
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    placeholder='Enter a note'
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    value={note.edescription}
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    placeholder='Enter a description here'
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="tag">
                    Tag (Optional):
                  </label>
                  <input value={note.etag} type="text" className="form-control" id="etag" name='etag' placeholder='Enter a tag (Optional)' onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.edescription.length < 5 || note.etitle.length < 5} type="button" className="btn btn-primary" onClick={handleSubmit}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 p-4">
        <h2>Your Notes</h2>
        {notes.length === 0 ? (
          <h3>No notes found</h3>  // Show this message when there are no notes
        ) : (
          notes.map((note) => (
            <NoteItems key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
          ))
        )}
      </div>
    </>
  )
}
export default Notes;