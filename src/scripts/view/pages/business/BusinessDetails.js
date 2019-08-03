import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

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
    marginTop: "2em"
  },
  header: {}
});

const BusinessDetails = ({ business, match }) => {
  const classes = useStyles();
  const { businesses, state } = business;
  const businessDetails = businesses.find(
    business => business.id === parseInt(match.params.businessID, 10)
  );
  const services = businessDetails.services.data;
  return (
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
        <Grid item md={10}>
          <h4 className={classes.header}>سرویس‌ها</h4>
          <Grid container justify="space-between">
            {services.map((service, index) => (
              <Grid item lg={4} md={5} xs={10}>
                <Card className={classes.card} key={index}>
                  <CardContent>
                    <h4>{service.name}</h4>
                    <p>{service.description}</p>
                  </CardContent>
                  <CardActions />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  business: state.business
});

export default connect(mapStateToProps)(withRouter(BusinessDetails));
