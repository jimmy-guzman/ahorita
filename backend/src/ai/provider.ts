import { createOpenRouter } from "@openrouter/ai-sdk-provider";

import env from "../env";

const openrouter = createOpenRouter({ apiKey: env.OPENROUTER_API_KEY });

export const orchestratorModel = openrouter.chat(env.CHAT_ORCHESTRATOR_MODEL);
export const specialistModel = openrouter.chat(env.CHAT_SPECIALIST_MODEL);
