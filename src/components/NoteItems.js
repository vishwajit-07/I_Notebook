import React, { useContext } from 'react'
import NotesContext from '../context/notes/NotesContext';

function NoteItems(props) {
    const context = useContext(NotesContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card shadow">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-duotone fa-solid fa-trash mx-3" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success"); }}></i>
                        <i className="fa-regular fa-pen-to-square" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { updateNote(note); }}></i>
                    </div>
                    <p className="card-text">
                        {note.description}
                    </p>
                    <p>
                        {note.tag}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NoteItems
