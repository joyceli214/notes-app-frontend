import { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import { fetchNotes, createNote, updateNote, deleteNote } from '@/lib/api';
import NoteList from '@/components/NoteList';
import NoteForm from '@/components/NoteForm';
import Modal from '@/components/Modal';
import SortButton from '@/components/SortButton';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [sortOption, setSortOption] = useState<string>('date-desc');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getNotes = async () => {
      const notesData = await fetchNotes();
      setNotes(notesData);
    };
    getNotes();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note._id !== id));
  };

  const handleCreate = async (newNote: Note) => {
    const createdNote = await createNote(newNote);
    sortNotes([...notes, createdNote], sortOption);
    setIsModalOpen(false);
  };

  const handleUpdate = async (updatedNote: Note) => {
    const updated = await updateNote(updatedNote);

    sortNotes(
      notes.map((note) => (note._id === updatedNote._id ? updated : note)),
      sortOption,
    );
    setIsModalOpen(false);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    sortNotes(notes, option);
  };

  const sortNotes = (notes: Note[], option: string) => {
    if (option === 'title-asc') {
      notes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === 'title-desc') {
      notes.sort((a, b) => b.title.localeCompare(a.title));
    } else if (option === 'date-asc') {
      notes.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    } else if (option === 'date-desc') {
      notes.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    setNotes(notes);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setEditingNote(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add New Note
        </button>
        <SortButton sortOption={sortOption} onSortChange={handleSortChange} />
      </div>

      <NoteList
        notes={notes}
        onDelete={handleDelete}
        onEdit={(note) => {
          setEditingNote(note);
          setIsModalOpen(true);
        }}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm
          note={editingNote}
          onSave={editingNote ? handleUpdate : handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
