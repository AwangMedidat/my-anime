import React from "react";

import { RouterProvider, createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "./pages/Home/index";
import Detail from "./pages/Detail/index";


const App: React.FC = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/detail/:id",
      element: <Detail/>,
    },
    // {
    //   path: "/result",
    //   element: <Result />,
    // },
    // {
    //   path: "/detail/:id",
    //   element: <Detail />,
    // },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default App;
