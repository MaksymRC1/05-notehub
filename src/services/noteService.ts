import axios from 'axios';
import type { FetchNotesParams, FetchNotesResponse, Note } from '../types/note';

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

instance.interceptors.request.use(config => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchNotes = async (params?: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await instance.get<FetchNotesResponse>('/notes', { params });
  return response.data;
};

export const createNote = async (
  note: Pick<Note, 'title' | 'content' | 'tag'>
): Promise<Note> => {
  const response = await instance.post<{ data: Note }>('/notes', note);
  return response.data.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await instance.delete<{ data: Note }>(`/notes/${id}`);
  return response.data.data;
};
