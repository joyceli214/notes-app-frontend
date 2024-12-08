import { useState, useEffect } from 'react';
import { Note } from '@/types/note';

interface NoteFormProps {
  note: Note | null;
  onSave: (note: Note) => void;
  onCancel: () => void;
}

export default function NoteForm({ note, onSave, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      setErrorMessage('Both title and content are required.');
      return;
    }

    const noteToSave = {
      title,
      content,
      createdAt: new Date().toISOString(),
      _id: note?._id ?? null,
    };

    onSave(noteToSave);
    setErrorMessage(null); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">
        {note ? 'Edit Note' : 'Create Note'}
      </h2>

      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}

      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
