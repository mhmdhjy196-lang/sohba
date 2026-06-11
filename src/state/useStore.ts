import { create } from 'zustand';

interface SohbaState {
  search: string;
  selectedRoomId: string | null;
  darkMode: boolean;
  activeSection: 'rooms' | 'tasks' | 'quran' | 'study' | 'dhikr' | 'profile';
  setSearch: (value: string) => void;
  setSelectedRoomId: (value: string | null) => void;
  setDarkMode: (value: boolean) => void;
  setActiveSection: (section: SohbaState['activeSection']) => void;
}

export const useSohbaStore = create<SohbaState>((set) => ({
  search: '',
  selectedRoomId: null,
  darkMode: true,
  activeSection: 'rooms',
  setSearch: (value) => set({ search: value }),
  setSelectedRoomId: (value) => set({ selectedRoomId: value }),
  setDarkMode: (value) => set({ darkMode: value }),
  setActiveSection: (section) => set({ activeSection: section }),
}));
