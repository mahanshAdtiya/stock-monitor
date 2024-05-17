import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import api from "../services/api";
import Note
 from "./Note";
interface Note {
    id: number;
    title: string;
    content: string;
}

const TestComponent: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const res = await api.get("/api/notes/");
            const data: Note[] = res.data;
            setNotes(data);
            console.log(data);
        } catch (err) {
            alert(err);
        }
    };

    const deleteNote = async (id: number) => {
        console.log(id);
        try {
            const res = await api.delete(`/api/notes/delete/${id}/`);
            if (res.status === 204) alert("Note deleted!");
            else alert("Failed to delete note.");
            getNotes();
        } catch (error) {
            alert(error);
        }
    };

    const createNote = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/notes/", { content, title });
            if (res.status === 201) alert("Note created!");
            else alert("Failed to make note.");
            getNotes();
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
};

export default TestComponent;
