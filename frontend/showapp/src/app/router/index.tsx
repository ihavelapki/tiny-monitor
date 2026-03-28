import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AppLayout } from '../layouts/AppLayout';
import { HomePage } from '../../pages/home';
import { MetricsPage } from '../../pages/metrics';
import { ServersPage } from '../../pages/servers';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'metrics',
        element: <MetricsPage />,
      },
      {
        path: 'servers',
        element: <ServersPage />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};