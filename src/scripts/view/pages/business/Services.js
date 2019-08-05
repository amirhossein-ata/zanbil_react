import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { add_service } from "../../../core/actions/service";

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
  service: {
    marginTop: "2em"
  }
}));

const AddServiceForm = ({
  dispatch,
  businessID,
  token,
  employers,
  closeModal
}) => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [employer, setEmployer] = useState(1);
  const [start_day, setStartDay] = useState("");
  const [end_day, setEndDay] = useState("");
  const [start_middle_rest, setStartMiddleRest] = useState("");
  const [end_middle_rest, setEndMiddleRest] = useState("");
  const [time_length, setTimeLength] = useState(0);
  const [gap_length, setGapLength] = useState(0);

  const handleChange = field => e => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "description") {
      setDescription(e.target.value);
    } else if (field === "employer") {
      setEmployer(e.target.value);
    } else if (field === "address") {
      setAddress(e.target.value);
    } else if (field === "start_day") {
      setStartDay(e.target.value);
    } else if (field === "end_day") {
      setEndDay(e.target.value);
    } else if (field === "start_middle_rest") {
      setStartMiddleRest(e.target.value);
    } else if (field === "end_middle_rest") {
      setEndMiddleRest(e.target.value);
    } else if (field === "time_length") {
      setTimeLength(e.target.value);
    } else {
      setGapLength(e.target.value);
    }
  };
  const submit = () => {
    dispatch(
      add_service(
        {
          name,
          description,
          address,
          business_id: businessID,
          employer_id: employer,
          start_day,
          end_day,
          start_middle_rest,
          end_middle_rest,
          time_length,
          gap_length
        },
        token,
        closeModal
      )
    );
  };

  const firstStep = (
    <div>
      <div className={classes.formInput}>
        <InputLabel required> نام</InputLabel>
        <TextField
          id="outlined-name"
          className={classes.textField}
          value={name}
          onChange={handleChange("name")}
          margin="normal"
        />
        <InputLabel required> توضیح سرویس</InputLabel>
        <TextField
          id="outlined-name"
          className={classes.textField}
          value={description}
          onChange={handleChange("description")}
          margin="normal"
        />
        <InputLabel required> آدرس</InputLabel>
        <TextField
          id="outlined-name"
          className={classes.textField}
          value={address}
          onChange={handleChange("address")}
          margin="normal"
        />
        <br />

        <InputLabel htmlFor="age-simple">کارمند</InputLabel>
        <FormControl className={classes.formControl}>
          <Select value={employer} onChange={handleChange("employer")}>
            {employers.map((employer, index) => (
              <MenuItem value={employer.id} key={index}>
                {employer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <br />

      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={() => setStep(2)}
      >
        مرحله بعد
      </Button>
    </div>
  );

  const secondStep = (
    <div>
      <div className={classes.formInput}>
        <InputLabel required>زمان شروع روز</InputLabel>
        <TextField
          id="outlined-name"
          className={classes.textField}
          value={start_day}
          onChange={handleChange("start_day")}
          margin="normal"
        />
        <InputLabel required> زمان پایان روز</InputLabel>
        <TextField
          id="outlined-name"
          className={classes.textField}
          value={end_day}
          onChange={handleChange("end_day")}
          margin="normal"
        />
        <InputLabel required> زمان شروع استراحت</InputLabel>
        <TextField
          id="outlined-name"
          className={classes.textField}
          value={start_middle_rest}
          onChange={handleChange("start_middle_rest")}
          margin="normal"
        />
        <InputLabel required>زمان پایان استراحت</InputLabel>
        <TextField
          id="outlined-name"
          className={classes.textField}
          value={end_middle_rest}
          onChange={handleChange("end_middle_rest")}
          margin="normal"
        />
        <InputLabel required>مدت زمان هر سانس</InputLabel>
        <TextField
          id="outlined-name"
          className={classes.textField}
          value={time_length}
          onChange={handleChange("time_length")}
          margin="normal"
        />
        <InputLabel required>فاصله بین هر زمان</InputLabel>
        <TextField
          id="outlined-name"
          className={classes.textField}
          value={gap_length}
          onChange={handleChange("gap_length")}
          margin="normal"
        />
        <br />

        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={submit}
        >
          ایجاد سرویس
        </Button>
      </div>
    </div>
  );

  return (
    <Grid container justify="center">
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <h3 className={classes.header}>فرم ایجاد سرویس</h3>
          {step === 1 ? firstStep : secondStep}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ({ dispatch, services, businessID, auth, employers }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Grid item md={10}>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => setOpen(false)}
      >
        <AddServiceForm
          dispatch={dispatch}
          businessID={businessID}
          token={auth.token}
          employers={employers}
          closeModal={() => setOpen(false)}
        />
      </Modal>

      <Grid container justify="space-between">
        <h4>سرویس</h4>
        <Button onClick={() => setOpen(true)}>اضافه کردن سرویس</Button>
      </Grid>
      <Grid container justify="space-between">
        {services.map((service, index) => (
          <Grid item lg={3} md={5} xs={10} className={classes.service}>
            <Card className={classes.card} key={index}>
              <CardContent>
                <h4>{service.name}</h4>
                <p>{service.description}</p>
              </CardContent>
              <CardActions>
                <Button>
                  <Link
                    to={{
                      pathname: `/service/${service.id}`,
                      state: { businessID: businessID }
                    }}
                  >
                    مشاهده سرویس
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
