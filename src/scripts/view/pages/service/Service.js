import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import moment from "moment";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    background: "#f2fafa",
    textAlign: "center"
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

const creatTimetable = ({
  start_day,
  end_day,
  start_middle_rest,
  end_middle_rest,
  time_length,
  gap_length
}) => {
  let result = [];
  let temp = moment(start_day, "h:mm");
  const end = moment(end_day, "h:mm");
  const time_length_int = parseInt(time_length);
  const gap_length_int = parseInt(gap_length);
  while (temp < end) {
    let hour = temp.hour();
    let minute = temp.minute();
    if (minute + time_length_int >= 60) {
      hour++;
      minute = minute + time_length_int - 60;
    } else {
      minute = minute + time_length_int;
    }
    const end_sans = "" + hour + ":" + minute;
    const start_sans = "" + temp.hour() + ":" + temp.minute();
    result.push([start_sans, end_sans]);
    if (minute + gap_length_int >= 60) {
      hour++;
      minute = minute + gap_length_int - 60;
    } else {
      minute = minute + gap_length_int;
    }

    temp = "" + hour + ":" + minute;
    temp = moment(temp, "h:mm");
  }
  return result;
};

const ServicePage = ({ dispatch, match, businesses, location }) => {
  const serviceID = parseInt(match.params.serviceID, 10);
  const businessID = location.state.businessID;
  const business = businesses.find(business => business.id === businessID);
  const serviceDetails = business.services.data.find(
    service => service.id === serviceID
  );
  const classes = useStyles();
  const timetable = creatTimetable(serviceDetails.timetable);
  return (
    <div>
      <br />
      <Grid container justify="center">
        <Grid item lg={10}>
          <Card className={classes.card}>
            <CardContent>
              <h4>{serviceDetails.name}</h4>
              <p>{serviceDetails.description}</p>
            </CardContent>
            <CardActions />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStataToProps = state => ({ businesses: state.business.businesses });

export default connect(mapStataToProps)(withRouter(ServicePage));
