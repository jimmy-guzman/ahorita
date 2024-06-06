import { customAlphabet } from "nanoid";

export const now = () => new Date().toISOString();

// cspell:disable-next-line
export const nanoid = customAlphabet("6T9834PX7JACKVERYMNDBUHWLFGQ", 4);
