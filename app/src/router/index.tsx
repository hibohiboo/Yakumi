import { createBrowserRouter } from 'react-router-dom';
import Top from '../App';
declare let VITE_DEFINE_BASE_PATH: string;
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Top />,
    },
  ],
  {
    basename: `/${VITE_DEFINE_BASE_PATH}`,
  },
);
