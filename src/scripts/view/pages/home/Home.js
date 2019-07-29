import React from "react";
import { Button } from "@material-ui/core";
import { loginRequest } from "../../../core/actions/auth";
import { get } from "../../../core/api/api";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJhZmJiYjI2ZThkYjA1Njc2ZWQyNzEzODg2ZmNjMTgzOTM4NzNiYWY4NTYwOThkZWNkYmQxMGQ2MDE3MjA2MzhiYjQ2MGY5MGZlZTJhYWY2In0.eyJhdWQiOiIxIiwianRpIjoiMmFmYmJiMjZlOGRiMDU2NzZlZDI3MTM4ODZmY2MxODM5Mzg3M2JhZjg1NjA5OGRlY2RiZDEwZDYwMTcyMDYzOGJiNDYwZjkwZmVlMmFhZjYiLCJpYXQiOjE1NjQzMDcxNDYsIm5iZiI6MTU2NDMwNzE0NiwiZXhwIjoxNTk1OTI5NTQ2LCJzdWIiOiIxMyIsInNjb3BlcyI6W119.MQ9mKBWDZP4hqUhoFSh5HN5Cl-XHbUKufol0LeP0sOWLepn0DvInC75zzQ1F7eWBUuO3GhnLgCSOiWqJPjo5OxfIyxtJWMW1qCrYrpiVzt2SVxUbmq1Ht-YbGle9hplApShbG8652kfmVuKpfSEcTesBqdfzG9nPbcxyuxac2syjUF7Pu35khvDnIfZiL0HwvdZ7zT-g8TGJkHM3tAj3_44Ztk6K1Kkmn05DdBAbxTQYX_VccVmG9nXe3-OoDGOu7TSraJ7eSQrdtD8nu8nPF6z6PV8blTrWT28TyHR1fCt5aDBH85qx8QeGkpXr_txQA_JwG8kXBUzlHb0fFmBLfZgXgs2EKTHTZDctJttQ8OY_xye8ZAnHOicWb8Ydtm-pBF3LbZB68vI1McESG8wDjWRCb3_-uPSxdTANwcpgP9x3SVkmyLesha2Mu89TVTqzbaA8UT6rkdIhDVnVfpoxFHlusKhD4h1S8os1bYw-4miZbOcg_iUWtf6rumYlExe9bg6ov85IHqqS1fnaEcXIJh_aMknw5gBPLrG-rwj6KF9sPg9twc0-cdA6fj0LSOodnj7e6il6llBQDrFkwHSvKe4VJzy4PL9nzVs_GGT-eL_nEROmdi6orN61MXKR6iSF_IQlA2D9VRr9v4BK43sRDqonXXwdDd6wFvIeuP2XBKU";
export default ({ dispatch }) => (
  <div>
    <Button
      onClick={() => {
        get(
          "/manager",
          undefined,
          token,
          response => console.log("this is then callback", response),
          e => console.log(e),
          true
        );
      }}
    >
      test saga
    </Button>
  </div>
);
