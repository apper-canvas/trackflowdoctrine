import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "@/components/organisms/Layout";

const BoardView = lazy(() => import("@/components/pages/BoardView"));
const ListView = lazy(() => import("@/components/pages/ListView"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <BoardView />
      </Suspense>
    ),
  },
  {
    path: "board",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <BoardView />
      </Suspense>
    ),
  },
  {
    path: "list",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <ListView />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <NotFound />
      </Suspense>
    ),
  },
];

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: mainRoutes,
  },
];

export const router = createBrowserRouter(routes);