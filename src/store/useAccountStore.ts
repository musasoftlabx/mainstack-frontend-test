// * NPM
import { create } from "zustand";

interface useAccountStore {
  credentials: {
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
  };
  login: (credentials: {
    first_name?: string;
    last_name?: string;
    email?: string;
  }) => void;
}

export const useAccountStore = create<useAccountStore>((set) => ({
  credentials: {},
  login: (credentials) =>
    set((state) => ({
      ...state,
      credentials: {
        firstName: credentials.first_name,
        lastName: credentials.last_name,
        emailAddress: credentials.email,
      },
    })),
}));
