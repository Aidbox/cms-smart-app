import React from "react";
import { Navigate, PartialRouteObject } from "react-router";
import EobDetail from "./pages/eob-detail";
import PatientRecord from "./components/PatientRecord";
import Layout from "./pages/layout";

const Routes = (): PartialRouteObject[] => {
  return [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <PatientRecord />,
        },
        {
          path: "/eob/:id",
          element: <EobDetail />,
        },
      ],
    },

    { path: "*", element: <Navigate to="/" /> },
  ];
};

export default Routes;
