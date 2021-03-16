import React from "react";
import classes from "./index.module.css";
import { getReadableNameFromUser } from "../../lib/fhirHelpers";
import Button from "../Button";
import { smartLaunchFx } from "../../domains/auth/effect";
import { resetAuth } from "../../domains/auth/events";

const Header = (props: any) => {
  const { user } = props;
  const link = user?.link.find((l: any) => l.link.resourceType === "Patient");
  const hasGrant = sessionStorage.getItem("SMART_KEY");

  return (
    <header className={classes.root}>
      <div className={classes.left}>
        {user?.photo && (
          <img src={user.photo} className={classes.avatar} alt="" />
        )}
        <span>{getReadableNameFromUser(user.name)}</span>
      </div>
      {!hasGrant && (
        <div>
          <Button
            title="Grant Access"
            onClick={() => smartLaunchFx(link.link.id)}
          />
        </div>
      )}
      <div>
        <Button
          title="Logout"
          type="outline"
          onClick={() => {
            sessionStorage.clear();
            resetAuth();
          }}
        />
      </div>
    </header>
  );
};

export default Header;
