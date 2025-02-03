import {userHandlers} from "./handlers/userHandlers.ts";
import {authHandlers} from "./handlers/authHandlers.ts";

export const handlers = [
    ...userHandlers,
    ...authHandlers
]