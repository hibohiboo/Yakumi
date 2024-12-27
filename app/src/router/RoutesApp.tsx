import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from '.';

export function RoutesApp() {
  const router = useMemo(() => createRouter(), []);
  return <RouterProvider router={router} />;
}
