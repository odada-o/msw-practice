// 브라우저용 Service Worker를 설정하는 파일
import { setupWorker } from 'msw/browser';
import {handlers} from "./handlers.ts";

export const worker = setupWorker(...handlers);
