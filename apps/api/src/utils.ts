import { addMonths } from "date-fns";
import { customAlphabet } from "nanoid";

export const nowAsISO = () => new Date().toISOString();
export const dueDateAsISO = () => addMonths(new Date(), 1).toISOString();

// cspell:disable-next-line
export const nanoid = customAlphabet("6T9834PX7JACKVERYMNDBUHWLFGQ", 4);
