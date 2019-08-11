import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Businesses from "./businesses";
import Reserves from "./reserves";

import { get_user_info } from "../../../core/actions/user";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    background: "#f2fafa",
    textAlign: "center"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  addButton: {
    margin: "2em"
  },
  services: {
    marginTop: "2em",
    marginBottom: "2em"
  }
});

const Profile = ({ dispatch, auth, user }) => {
  const classes = useStyles();
  useEffect(() => {
    dispatch(get_user_info(auth.token));
  }, []);
  return (
    <div>
      {user.state === "loaded" && (
        <Grid container justify="center">
          <Grid item md={10}>
            <br />
            <Card>
              <CardContent className={classes.card}>
                <div>{user.userInfo.name}</div>
                <div>
                  {user.userInfo.email} / {user.userInfo.phone_number}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={10}>
            <Businesses
              businesses={
                user.userInfo.business !== null ? [user.userInfo.business] : []
              }
            />
          </Grid>
          <br />
          <Grid item md={10}>
            <Reserves
              reserves={
                user.userInfo.reserves !== null
                  ? user.userInfo.reserves.data
                  : []
              }
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Profile);
