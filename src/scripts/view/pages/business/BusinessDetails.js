import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { get_businesses } from "../../../core/actions/business";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Employers from "./Employers";
import Services from "./Services";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    background: "#f2fafa"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
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
  },
  header: {},
  hr: {
    marginTop: "2.5em"
  }
});

const BusinessDetails = ({ dispatch, business, match, auth }) => {
  useEffect(() => {
    dispatch(get_businesses(auth.token));
  }, []);
  const classes = useStyles();
  const { businesses, state } = business;
  const businessDetails = businesses.find(
    business => business.id === parseInt(match.params.businessID, 10)
  );
  const services = businessDetails.services.data;
  const employers = businessDetails.employers.data;
  return (
    <div>
      <br />
      {state === "loaded" && (
        <div>
          <Grid container justify="center">
            <Grid item lg={10}>
              <Card className={classes.card}>
                <CardContent>
                  <h4>{businessDetails.name}</h4>
                  <p>{businessDetails.description}</p>
                </CardContent>
                <CardActions />
              </Card>
            </Grid>
          </Grid>
          <Grid className={classes.services} container justify="center">
            <Services
              services={services}
              dispatch={dispatch}
              auth={auth}
              employers={employers}
              businessID={parseInt(match.params.businessID, 10)}
            />
          </Grid>
          <Grid container justify="center">
            <Grid item md={10}>
              <hr className={classes.hr} />
            </Grid>
          </Grid>

          <Grid className={classes.services} container justify="center">
            <Grid item md={10}>
              <Employers
                employers={employers}
                dispatch={dispatch}
                businessID={parseInt(match.params.businessID, 10)}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  business: state.business
});

export default connect(mapStateToProps)(withRouter(BusinessDetails));
