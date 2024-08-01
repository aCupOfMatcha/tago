import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root'
import { Home, Users, UserEdit, usersLoader, userLoader } from './views'
import './index.css'
import ErrorPage from "./routes/errorPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import client from './client';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "users",
        element: <Users />,
        loader: usersLoader,
      },
      {
        path: "users/editUser/:id",
        element: <UserEdit />,
        loader: userLoader,
      },
      {
        path: "users/createUser",
        element: <UserEdit />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
)
