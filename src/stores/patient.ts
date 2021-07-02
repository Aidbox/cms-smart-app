import { fhirclient } from "fhirclient/lib/types";
import {
  attach,
  createDomain,
  createStore,
  forward,
  guard,
  sample,
} from "effector";

import { $client } from "./auth";

const patientDomain = createDomain("patient");

export const loadEob = patientDomain.createEvent<void>();
export const fetchPatientFx = patientDomain.createEffect<any, any, Error>(
  async (client) => {
    return client.request(
      `/Patient/${client.state.tokenResponse.userinfo.data.patient.id}`
    );
  }
);

export const fetchEobFx = patientDomain.createEffect<any, any, Error>(
  async ({ client }) =>
    client.request(
      `/ExplanationOfBenefit?patient=${client.state.tokenResponse.userinfo.data.patient.id}`
    )
);

export const resetData = patientDomain.createEvent();

export const $eob = createStore<any>([])
  .on(fetchEobFx.doneData, (_, data) => {
    return data.entry.map((e: any) => e.resource);
  })
  .reset(resetData);

export const $patient = createStore<fhirclient.FHIR.Patient | null>(null)
  .on(fetchPatientFx.doneData, (_, patient) => patient)
  .reset(resetData);

const loadEobFx = attach({
  source: $client,
  mapParams: (_, data) => {
    return { client: data };
  },
  effect: fetchEobFx,
});

sample({
  source: $client,
  target: fetchPatientFx,
});

sample({
  source: $client,
  target: fetchEobFx,
});

guard({
  source: $client,
  filter: (client: any) => client.state.tokenResponse?.access_token,
  target: fetchPatientFx,
});

guard({
  source: $client,
  filter: (client: any) => client.state.tokenResponse?.access_token,
  target: loadEobFx,
});

forward({ from: loadEob, to: loadEobFx });
