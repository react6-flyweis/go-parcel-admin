import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Routes } from "@/routes/index.route";
import { Loading } from "@/components/layouts/loading";

const router = createBrowserRouter(Routes);

export function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
