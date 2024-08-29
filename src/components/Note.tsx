import React from 'react'
import { format } from 'date-fns'
import { NoteProps } from '../types/note'

const Note : React.FC<NoteProps> = ({ title, summary, body, timestamp }) => {
    const date = new Date(timestamp).toISOString();
  return (
    <div className="flex flex-col p-4 px-5 rounded-md bg-purple-300 my-5">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-sm font-light text-slate-700">{summary}</p>
        <div className="flex flex-row justify-between items-center gap-2">
            <div className="text-xs text-purple-950">{timestamp.toLocaleDateString()}</div>
            <div className="text-xs text-purple-950">{format(date, 'HH:mm')}</div>
        </div>
    </div>
  )
}

export default Note