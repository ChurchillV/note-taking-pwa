import { NoteProps } from "./note";

export interface InputModalProps {
    onNoteSave: (newNote : NoteProps) => void;
}