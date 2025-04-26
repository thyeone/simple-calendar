import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import Main from '.';
import { Providers } from '@/providers/Providers';

function Root() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  );
}

const publicRoutes: RouteObject[] = [
  {
    element: <Outlet />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
    ],
  },
];

const privateRoutes: RouteObject[] = [
  {
    element: <Outlet />,
    children: [],
  },
];

const router = createBrowserRouter([
  { element: <Root />, children: [...publicRoutes, ...privateRoutes] },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
