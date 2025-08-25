import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Dados from './pages/Dados';
import DashboardApp from './pages/DashboardApp';
import Relate from './pages/Relate';
import Blog from './pages/Blog';
import AtlasToponimico from './pages/AtlasToponimico';
import NovoAtlasToponimico from './pages/NovoAtlasToponimico';
import NotFound from './pages/Page404';
import Users from './pages/Users';
import Posts from './pages/Posts';
import Post from './pages/Post';
import RecoverPassword from './pages/RecoverPassword';
import UpdatePassword from './pages/UpdatePassword';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'atlas', element: <AtlasToponimico /> },
        { path: 'atlas/novo', element: <NovoAtlasToponimico /> },
        { path: 'relate', element: <Relate /> },
        { path: 'users', element: <Users /> },
        { path: 'dados', element: <Dados /> },
        { path: 'posts', element: <Posts /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'blog', element: <Blog /> },
        { path: 'login', element: <Login /> },
        { path: 'recover-password', element: <RecoverPassword /> },
        { path: 'update-password', element: <UpdatePassword /> },
        { path: 'post/:id', element: <Post /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
