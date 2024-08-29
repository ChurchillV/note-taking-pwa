import { useState, useEffect } from 'react';
import { NoteProps } from '../types/note';
import { getNotesFromLocalDb } from '../lib/db';

export const useNotes = () => {
    const [notes, setNotes] = useState<NoteProps[]>([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        if(typeof window === "undefined") return;
        
        const fetchNotes = async () => {
            const notesFromDb = await getNotesFromLocalDb();
            setNotes(notesFromDb);
            setLoading(false);
        };

        fetchNotes();
    }, []);

    return { notes, loading };
};
