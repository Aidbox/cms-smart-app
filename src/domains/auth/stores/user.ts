import { createStore } from "effector";

import { getUserDataFx, initSmartClientFx, smartLaunchFx } from "../effect";
import { resetAuth } from "../events";

const $user = createStore<any>({ loading: true, data: null })
  .on(getUserDataFx.done, (_, data) => {
    return { loading: false, data: data.result, fhir: null };
  })
  .on(smartLaunchFx.done, (state, data) => {
    const url = new URL(data.result.link);
    const user = state.data;
    const link = user?.link.find((l: any) => l.link.resourceType === "Patient");
    return {
      ...state,
      fhir: {
        patientId: link.link.id,
        iss: url.searchParams.get("iss"),
        launch: url.searchParams.get("launch"),
      },
    };
  })
  .reset(resetAuth);

$user.watch((state) => {
  if (state.fhir) {
    initSmartClientFx(state.fhir);
    return;
  }
  if (!state.loading) {
    const user = state.data;
    const link = user?.link.find((l: any) => l.link.resourceType === "Patient");
    if (link) {
      initSmartClientFx({});
    }
  }
});

(window as any).$user = $user;
export default $user;
