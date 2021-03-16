import { createStore } from "effector";
import { persist } from "effector-storage/local/fp";

import { getUserDataFx, signInFx } from "../effect";
import { resetAuth } from "../events";

const $token = createStore<string>("", { name: "auth" })
  .on(signInFx.done, (_state, data) => data.result.access_token)
  .on(getUserDataFx.fail, () => "")
  .reset(resetAuth)
  .thru(persist({ key: "aidbox.login" }));

$token.watch((token) => {
  if (token) {
    getUserDataFx(token);
  }
});

(window as any).$token = $token;
export default $token;
