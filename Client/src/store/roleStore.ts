import { create } from "zustand";

type RoleState = {
  role: string | null;
  setRole: (role: string | null, rememberMe: boolean) => void;
  loadRole: () => void;
};

export const roleStore = create<RoleState>((set) => ({
  role: null,
  setRole: (role, rememberMe) => {
    set({ role });

    // Simpan role sesuai rememberMe
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("role", role || "");
  },

  loadRole: () => {
    // Cek di localStorage atau sessionStorage
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    if (role) {
      set({ role });
    }
  },
}));
