import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { add_reserve, get_reserves } from "../../../core/actions/reserves";
import { get_businesses } from "../../../core/actions/business";

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
  },
  day: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  },
  timetable: {
    marginTop: "3em"
  },
  time: {
    marginBottom: "1em"
  },
  nextWeekButton: {
    display: "flex",
    justifyContent: "flex-end"
  },
  date: {
    textAlign: "center",
    padding: "1%"
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
    const end_sans =
      minute === 0 ? "" + hour + ":" + minute + "0" : "" + hour + ":" + minute;
    const start_sans =
      temp.minute() === 0
        ? "" + temp.hour() + ":" + temp.minute() + "0"
        : "" + temp.hour() + ":" + temp.minute();
    if (
      temp < moment(start_middle_rest, "h:mm") ||
      temp > moment(end_middle_rest, "h:mm")
    ) {
      result.push([start_sans, end_sans]);
    }
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

const ServicePage = ({
  dispatch,
  match,
  businesses,
  location,
  auth,
  reserve
}) => {
  const [firstOfWeek, setFirstOfWeek] = useState(moment().startOf("week"));
  const [endOfWeek, setEndOfWeek] = useState(
    moment()
      .startOf("week")
      .add(6, "days")
  );
  const serviceID = parseInt(match.params.serviceID, 10);
  const businessID = location.state.businessID;
  const business = businesses.find(business => business.id === businessID);
  const serviceDetails = business.services.data.find(
    service => service.id === serviceID
  );
  const classes = useStyles();
  const timetable = creatTimetable(serviceDetails.timetable);

  useEffect(() => {
    dispatch(get_businesses(auth.token));
    dispatch(get_reserves(auth.token));
  }, []);

  const isTimeFull = (date, time) => {
    const reserved = reserve.reserves.findIndex(res => {
      const reserve_time = moment(res.start_time);
      const timetable_time = moment(time, "h:mm");
      return (
        moment(res.reserve_date).dates() === moment(date).dates() &&
        reserve_time.hour() === timetable_time.hour() &&
        reserve_time.minute() === timetable_time.minutes()
      );
    });
    return reserved === -1 ? false : true;
  };
  const day = date => (
    <Grid className={classes.day} item>
      {timetable.map((time, index) => (
        <Button
          className={classes.time}
          key={index}
          variant="outlined"
          color="primary"
          onClick={() => {
            dispatch(
              add_reserve(
                {
                  start_time: time[0],
                  end_time: time[1],
                  service_id: serviceID,
                  reserve_date: date.format("L")
                },
                auth.token
              )
            );
          }}
          disabled={isTimeFull(date, time)}
        >
          {" "}
          {time[1]} - {time[0]}{" "}
        </Button>
      ))}
    </Grid>
  );

  return (
    <div>
      <br />
      <Grid container justify="center">
        <Grid item md={10}>
          <Card className={classes.card}>
            <CardContent>
              <h4>{serviceDetails.name}</h4>
              <p>{serviceDetails.description}</p>
            </CardContent>
            <CardActions />
          </Card>
        </Grid>
        <br />
        <Grid item md={10} className={classes.timetable}>
          <Card>
            <CardContent>
              <Grid container justify="space-between">
                <Grid item md={3}>
                  <Button
                    onClick={() => {
                      setFirstOfWeek(moment(firstOfWeek).add(-7, "days"));
                      setEndOfWeek(moment(endOfWeek).add(-7, "days"));
                    }}
                  >
                    هفته‌ی قبل
                  </Button>
                </Grid>
                <Grid item md={5} className={classes.date}>
                  {firstOfWeek.format("L")} - {endOfWeek.format("L")}
                </Grid>
                <Grid item md={3} className={classes.nextWeekButton}>
                  <Button
                    onClick={() => {
                      setFirstOfWeek(moment(firstOfWeek).add(7, "days"));
                      setEndOfWeek(moment(endOfWeek).add(7, "days"));
                    }}
                  >
                    هفته‌ی بعد
                  </Button>
                </Grid>
              </Grid>
              {reserve.state === "loaded" && (
                <Grid
                  className={classes.timetable}
                  container
                  justify="space-evenly"
                >
                  <Grid className={classes.day} item>
                    شنبه
                    {day(moment(firstOfWeek))}
                  </Grid>
                  <Grid className={classes.day} item>
                    یکشنبه
                    {day(moment(firstOfWeek).add(1, "days"))}
                  </Grid>
                  <Grid className={classes.day} item>
                    دوشنبه
                    {day(moment(firstOfWeek).add(2, "days"))}
                  </Grid>
                  <Grid className={classes.day} item>
                    سه‌شنبه
                    {day(moment(firstOfWeek).add(3, "days"))}
                  </Grid>
                  <Grid className={classes.day} item>
                    چهارشنبه
                    {day(moment(firstOfWeek).add(4, "days"))}
                  </Grid>
                  <Grid className={classes.day} item>
                    پنجشنبه
                    {day(moment(firstOfWeek).add(5, "days"))}
                  </Grid>
                  <Grid className={classes.day} item>
                    جمعه
                    {day(moment(firstOfWeek).add(6, "days"))}
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStataToProps = state => ({
  businesses: state.business.businesses,
  reserve: state.reserve
});

export default connect(mapStataToProps)(withRouter(ServicePage));
