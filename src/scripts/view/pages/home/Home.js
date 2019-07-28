import React from "react";
import { Button } from "@material-ui/core";
import { loginRequest } from "../../../core/actions/auth";
import { post } from "../../../core/api/api";

export default ({ dispatch }) => (
  <div>
    <Button
      onClick={() => {
        post(
          "/api/auth/signup",
          {
            name: "test",
            email: "testt@email.com",
            password: "1234",
            password_confirmation: "1234",
            phone_number: "09123423499",
            type: "customer"
          },
          undefined,
          response => console.log("this is then callback", response),
          e => console.log(e),
          false
        );
      }}
    >
      test saga
    </Button>
  </div>
);
