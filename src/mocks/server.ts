import { setupServer } from 'msw/node';
import { userHandlers } from './handlers/userHandlers.ts';

export const server = setupServer(...userHandlers);
