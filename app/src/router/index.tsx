import TextPage from '@yakumi-app/pages/TextPage';
import { createBrowserRouter } from 'react-router-dom';
import Top from '../App';
declare let VITE_DEFINE_BASE_PATH: string;
export const basePath = VITE_DEFINE_BASE_PATH;
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Top />,
    },
    {
      path: '/text',
      element: <TextPage />,
    },
  ],
  {
    basename: `/${basePath}`,
  },
);
