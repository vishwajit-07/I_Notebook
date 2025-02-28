const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Route 1 :Get all the notes using: GET "/api/auth/getuser". Login required
router.get('/fetchallnotes', fetchuser ,async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// Route 2 :Add note using: Post "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title','Enter a valid title').isLength( {min:3} ),
    body('description','Enter a valid description').isLength( {min:5} ),],
    async(req, res)=>{
        try{
        const {title, description,tag}=req.body;
        //If their is a error return bad request and errors
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const note = new Note({
            title, description, tag, user:req.user.id
        })
        const savedNote= await note.save();
        res.json(savedNote);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    })

    //Route 3 : update an existing note with PUT "/api/notes.updatenote" Login required
    router.put('/updatenote/:id', fetchuser, 
        async(req, res)=>{
            const {title,description,tag} = req.body;
            //create a new note object
            const newNote = {};
            if(title){newNote.title = title;}
            if(description){newNote.description = description;}
            if(tag){newNote.tag = tag;}

            //find the note that you want to updated to update
            let note =await Note.findById(req.params.id);
            if(!note){return res.status(404).send("Not found")}
            if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
            note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
            res.json({note});
        })

    //Route 4 : delete an existing note with DELETE "/api/notes.deletenote" Login required
    router.delete('/deletenote/:id', fetchuser, 
        async(req, res)=>{
            //find the note that you want to delete
            let note =await Note.findById(req.params.id);
            if(!note){return res.status(404).send("Not found")}

            //Allow deletion only if user owns this note
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed")
            }
            note = await Note.findByIdAndDelete(req.params.id)
            res.json({"Success":" Note has been deleted",note:note});
        })
module.exports = router;