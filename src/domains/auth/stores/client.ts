import Client from "fhirclient/lib/Client";
import { createStore } from "effector";

import { initSmartClientFx } from "../effect";

const $client = createStore<Client | null>(null).on(
  initSmartClientFx.done,
  (state, { result: client }) => client
);

(window as any).$client = $client;
export default $client;
