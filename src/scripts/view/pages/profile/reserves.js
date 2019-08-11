import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  card: {
    width: "90%",
    background: "#f2fafa"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    marginTop: "20vh"
  },

  textField: {
    textAlign: "right",
    marginBottom: theme.spacing(3)
  },

  header: {
    // marginRight: "20%",
    marginBottom: theme.spacing(5)
  },
  reserve: {
    marginTop: "2em"
  }
}));

export default ({ reserves }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container justify="space-between">
        <h4>رزروها</h4>
      </Grid>
      <Grid container justify="space-between">
        {reserves.map((reserve, index) => (
          <Grid item lg={3} md={5} xs={10} className={classes.reserve}>
            <Card className={classes.card} key={index}>
              <CardContent>
                <h4>{reserve.service.name}</h4>
                <p>
                  {reserve.start_time} - {reserve.end_time}
                </p>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
