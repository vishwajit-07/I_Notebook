import React, { useContext, useState } from 'react'
import NotesContext from '../context/notes/NotesContext';


function AddNote(props) {
    const context = useContext(NotesContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: '', description: '', tag: '' })

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({ title: '', description: '', tag: '' });
        props.showAlert("Note added Successfully","success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-3 shadow p-4">
                <h2>Add Notes</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="note" className="form-label">
                            Note
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder='Enter a note'
                            onChange={onChange}
                            minLength={5}
                            required
                            value={note.title}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            onChange={onChange}
                            placeholder='Enter a description here'
                            minLength={5}
                            required
                            value={note.description}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="tag">
                            Tag (Optional):
                        </label>
                        <input type="text" value={note.tag} className="form-control" id="tag" name='tag' placeholder='Enter a tag (Optional)' onChange={onChange} />
                    </div>
                    <button disabled={note.description.length < 5 || note.title.length < 5} type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        Add Note
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
