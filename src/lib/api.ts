import { Note } from '@/types/note';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const fetchNotes = async (): Promise<Note[]> => {
  const response = await api.get('/notes');
  return response.data;
};

export const createNote = async (newNote: Note): Promise<Note> => {
  const response = await api.post('/notes', {
    title: newNote.title,
    content: newNote.content,
  });
  return response.data;
};

export const updateNote = async (updatedNote: Note): Promise<Note> => {
  const response = await api.put(`/notes/${updatedNote._id}`, {
    title: updatedNote.title,
    content: updatedNote.content,
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
