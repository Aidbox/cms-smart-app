import React, { FC } from "react";
import { Grid } from "semantic-ui-react";
import { useGate } from "effector-react";
import ExplanationOfBenefits from "./ExplanationOfBenefits";

import PatientBadge from "./PatientBadge/PatientBadge";
import { AppGate } from "../stores/auth";

const PatientRecord: FC = () => {
  useGate(AppGate);

  return (
    <>
      <Grid container>
        <Grid.Column tablet={4} largeScreen={4} widescreen={4} mobile={16}>
          <PatientBadge />
        </Grid.Column>
        <Grid.Column tablet={12} largeScreen={12} widescreen={12} mobile={16}>
          <ExplanationOfBenefits />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default PatientRecord;
