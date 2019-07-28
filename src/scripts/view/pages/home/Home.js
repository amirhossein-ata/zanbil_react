import React from "react";
import { Button } from "@material-ui/core";
import { loginRequest } from "../../../core/actions/auth";
export default ({ dispatch }) => (
  <div>
    <Button
      onClick={() => {
        dispatch(loginRequest());
      }}
    >
      test saga
    </Button>
  </div>
);
