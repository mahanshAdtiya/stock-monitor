import React from "react";

interface NoteProps {
    note: {
        id: number;
        title: string;
        content: string;
        created_at: string; // Assuming this is a string representation of date
    };
    onDelete: (id: number) => void;
}

const Note: React.FC<NoteProps> = ({ note, onDelete }) => {
    if (!note) return null; // Null check to handle if note is null or undefined

    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    return (
        <div className="note-container">
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
};

export default Note;
