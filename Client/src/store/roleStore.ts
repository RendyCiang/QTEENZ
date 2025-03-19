import { create } from "zustand";

type RoleState = {
  role: string | null;
  setRole: (role: string | null, rememberMe: boolean) => void;
  loading: boolean;
  loadRole: () => void;
};

export const roleStore = create<RoleState>((set) => ({
  role: null,
  setRole: (role, rememberMe) => {
    set({ role });

    // Simpan role sesuai rememberMe
    localStorage.setItem("role", role || "");
  },
  loading: true,
  loadRole: async () => {
    const storedRole = localStorage.getItem("role")
      ? localStorage.getItem("role")
      : sessionStorage.getItem("role");
    set({ role: storedRole, loading: false });
  },
}));
