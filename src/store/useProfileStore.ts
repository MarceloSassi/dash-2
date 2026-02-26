import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProfileState {
  avatar?: string; // base64
}

interface ProfileActions {
  setAvatar: (b64: string | undefined) => void;
  clearAvatar: () => void;
}

type ProfileStore = ProfileState & ProfileActions;

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      avatar: undefined,
      setAvatar: (b64) => set({ avatar: b64 }),
      clearAvatar: () => set({ avatar: undefined }),
    }),
    {
      name: 'profile-storage',
    }
  )
);