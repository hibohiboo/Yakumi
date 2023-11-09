import { RouterProvider } from "react-router-dom";
import { router } from ".";

export function RoutesApp() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}
