import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      result: null,

      setUser: (user) => {
        set({ user });
      },
        setResult: (result) => {
        set({ result });
      }
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
