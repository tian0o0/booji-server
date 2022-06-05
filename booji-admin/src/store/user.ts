import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { User } from "@/types";

const { persistAtom } = recoilPersist({
  key: "Recoil",
  storage: window.localStorage,
});

export const userState = atom<User | null>({
  key: "userState",
  default: null,
  effects: [persistAtom],
});
