import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { FHIRClientProvider } from "../context/FhirClient";
import Header from "../components/Header";
import Home from "./home/Home";
import $client from "../domains/auth/stores/client";
import $user from "../domains/auth/stores/user";

const IndexPage: React.FC = () => {
  const { loading, data: user, fhir } = useStore($user);
  const client = useStore($client);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <FHIRClientProvider client={client}>
      {client ? (
        <>
          <Header user={user} />
          <main style={{ padding: "1rem" }}>
            <Home client={client} />
          </main>
          <footer />
        </>
      ) : (
        <Header user={user} />
      )}
    </FHIRClientProvider>
  );
};

export default IndexPage;
