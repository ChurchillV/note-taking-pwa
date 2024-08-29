import { openDB } from "idb";

const dbPromise  = openDB('note-taker', 1, {
    upgrade(db) {
        db.createObjectStore('notes', {
            keyPath: 'id',
            autoIncrement: true,
        });
    },
});

export const saveNoteToLocalDb = async (note) => {
    const db = await dbPromise;
    await db.put('notes', note);
};

export const getNotesFromLocalDb = async () => {
    const db = await dbPromise;
    return await db.getAll('notes');
} 

export const deleteNoteFromLocalDb = async (id) => {
    const db = await dbPromise;
    await db.delete('notes', id);
}