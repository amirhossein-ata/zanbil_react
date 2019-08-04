import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { signupRequest } from "../../../core/actions/auth";

const useStyles = makeStyles(theme => ({
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
  hr: {
    marginTop: "2.5em"
  },
  modalWrapper: {
    background: "white",
    minHeight: "60vh",
    width: "60vh",
    marginTop: "10vh",
    marginRight: "20vh",
    padding: "4em"
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
  }
}));

const AddEmployerForm = ({ dispatch, businessID }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const handleChange = field => e => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "phone_number") {
      setPhoneNumber(e.target.value);
    } else if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "password_confirmation") {
      setPasswordConfirmation(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const submit = () => {
    dispatch(
      signupRequest({
        name,
        email,
        phone_number,
        password,
        password_confirmation,
        type: "employer",
        business_id: businessID
      })
    );
  };

  return (
    <Grid container justify="center">
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <h3 className={classes.header}>فرم ثبت‌نام</h3>
          <div className={classes.formInput}>
            <InputLabel required> نام</InputLabel>
            <TextField
              id="outlined-name"
              className={classes.textField}
              value={name}
              onChange={handleChange("name")}
              margin="normal"
            />
            <InputLabel required> ایمیل</InputLabel>
            <TextField
              id="outlined-name"
              className={classes.textField}
              value={email}
              onChange={handleChange("email")}
              margin="normal"
            />
            <InputLabel required> شماره تلفن همراه</InputLabel>
            <TextField
              id="outlined-name"
              className={classes.textField}
              value={phone_number}
              onChange={handleChange("phone_number")}
              margin="normal"
            />
            <InputLabel required> رمز عبور</InputLabel>
            <TextField
              type="password"
              id="outlined-name"
              className={classes.textField}
              value={password}
              onChange={handleChange("password")}
              margin="normal"
            />
            <InputLabel required> تکرار رمز عبور</InputLabel>
            <TextField
              type="password"
              id="outlined-name"
              className={classes.textField}
              value={password_confirmation}
              onChange={handleChange("password_confirmation")}
              margin="normal"
            />
          </div>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={submit}
          >
            ثبت‌نام
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default ({ employers, dispatch, businessID }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => setOpen(false)}
      >
        <AddEmployerForm dispatch={dispatch} businessID={businessID} />
      </Modal>
      <Grid container justify="space-between">
        <h4>کارمند‌ها</h4>
        <Button onClick={() => setOpen(true)}>اضافه کردن کارمند</Button>
      </Grid>
      <Grid container justify="space-between">
        {employers.map((employer, index) => (
          <Grid item lg={4} md={5} xs={10}>
            <Card className={classes.card} key={index}>
              <CardContent>
                <h4>{employer.name}</h4>
                <p>{employer.description}</p>
              </CardContent>
              <CardActions />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
