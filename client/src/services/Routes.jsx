import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout'; // ปรับ path ตามโครงสร้างโปรเจคของคุณ
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import Skills from '../pages/Skills';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'skills',
        element: <Skills />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;