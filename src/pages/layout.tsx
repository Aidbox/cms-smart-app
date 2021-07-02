import React from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "../components/ErrorBoundary";

const Layout: React.FC = () => {
  return (
    <ErrorBoundary>
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
      <footer />
    </ErrorBoundary>
  );
};

export default Layout;
