import { atom } from "recoil";

export const themeToggleState = atom<boolean>({
  key: "themeToggleState",
  default: false,
});
