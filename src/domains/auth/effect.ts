import { createEffect } from "effector";

import env from "../../env";
import { initSmartClient } from "../../lib";

interface ISignInProps {
  username: string;
  password: string;
}

export const signInFx = createEffect(
  async ({ username, password }: ISignInProps) => {
    const response = await fetch(`${env.FHIR_SERVER}/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "password",
        username,
        password,
        client_id: env.CLIENT_LOGIN,
      }),
    });
    const json = await response.json();
    if (json?.error) {
      return Promise.reject(json);
    }
    return json;
  }
);

export const getUserDataFx = createEffect(async (token: string) => {
  const response = await fetch(`${env.FHIR_SERVER}/auth/userinfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  if (json?.message) {
    return Promise.reject(json);
  }
  return json;
});

export const smartLaunchFx = createEffect(async (patient: string) => {
  const formData = new FormData();
  formData.append("patientId", patient);
  formData.append("scope", "launch");
  formData.append("clientId", env.CLIENT_SMART);
  const response = await fetch(`${env.FHIR_SERVER}/smart/launch`, {
    method: "POST",
    body: formData,
  });
  const json = await response.json();
  if (json?.link) {
    return json;
  }
  return Promise.reject(json);
});

export const initSmartClientFx = createEffect(initSmartClient);
