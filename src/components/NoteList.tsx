import { Note } from '@/types/note';

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export default function NoteList({ notes, onDelete, onEdit }: NoteListProps) {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note._id} className="p-4 border rounded-md">
          <h3 className="font-bold text-lg">{note.title}</h3>
          <p>{note.content}</p>
          <p className="text-sm text-gray-500">
            {new Date(note.createdAt).toLocaleString()}
          </p>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => onEdit(note)}
              className="bg-yellow-500 text-white py-1 px-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note._id!)}
              className="bg-red-500 text-white py-1 px-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
