import { createDomain, guard } from "effector";
import { createGate } from "effector-react";
import Client from "fhirclient/lib/Client";
import { initSmartClient, readySmartClient } from "../lib";

const authDomain = createDomain("auth");

export const AppGate = createGate("App gate");

export const setClientFromStorage = authDomain.createEvent<any>();

export const initSmartClientFx = authDomain.createEffect(initSmartClient);
export const readySmartClientFx = authDomain.createEffect(readySmartClient);

export const $client = authDomain
  .createStore<Client | null>(null)
  .on(initSmartClientFx.doneData, (_, data) => {
    return data;
  })
  .on(setClientFromStorage, (_, data) => {
    return data;
  });

guard({
  clock: AppGate.status,
  filter: (status) => status,
  target: initSmartClientFx,
});
