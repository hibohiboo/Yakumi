import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

declare let VITE_DEFINE_BASE_PATH: string;
const basePath = VITE_DEFINE_BASE_PATH;

export const initMSW = async () => {
  // if (import.meta.env.DEV) { jestの場合はimport.meta.env.DEVがfalseになる
  if (location.host.includes('localhost')) {
    const worker = setupWorker(...handlers);
    await worker.start({
      serviceWorker: {
        url: `/${basePath}/mockServiceWorker.js`,
      },
      onUnhandledRequest: 'bypass',
    });
  }
};
