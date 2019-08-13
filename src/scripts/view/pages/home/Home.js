import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import useDimensions from "../../../core/utils/useDimensions";
import LoginForm from "../../components/forms/LoginForm";
import SignupForm from "../../components/forms/SignupForm";

export default ({ dispatch, auth, history }) => {
  const [containerRef, containerSize] = useDimensions({ liveMeasure: true });
  const [isSignUp, setIsSingup] = useState(false);
  const revertForm = isSignUp => {
    setIsSingup(!isSignUp);
    console.log(isSignUp);
  };

  return (
    <div ref={containerRef} style={{ height: "100vh" }}>
      {containerSize.width > 1024 ? (
        <Grid container style={{ height: "100%" }}>
          <Grid item xs={5} md={4} justify="center">
            {isSignUp ? (
              <SignupForm revertForm={revertForm} />
            ) : (
              <LoginForm revertForm={revertForm} />
            )}
          </Grid>
          <Grid item xs={7} md={8} className="langing__photo">
            <img
              alt=""
              width="100%"
              height="100%"
              src={require("../../../../assets/images/landing_page_photo.jpg")}
            />
          </Grid>
        </Grid>
      ) : (
        <div>
          {isSignUp ? (
            <SignupForm
              revertForm={revertForm}
              auth={auth}
              history={history}
              dispatch={dispatch}
            />
          ) : (
            <LoginForm
              revertForm={revertForm}
              auth={auth}
              history={history}
              dispatch={dispatch}
            />
          )}
        </div>
      )}
    </div>
  );
};
