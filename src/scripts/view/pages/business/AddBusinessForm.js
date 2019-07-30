import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { InputLabel } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { add_business } from "../../../core/actions/business";

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "700px"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
    marginTop: theme.spacing(10)
  },
  textField: {
    width: "100%",
    textAlign: "right",
    marginBottom: theme.spacing(3)
  },
  formInput: {
    // marginRight: "20%"
  },
  button: {
    // marginRight: "20%"
  },
  header: {
    marginBottom: theme.spacing(5)
  }
}));

export default ({ dispatch, history, auth }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const handleChange = field => e => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "description") {
      setDescription(e.target.value);
    } else {
      setAddress(e.target.value);
    }
  };

  const submit = () => {
    dispatch(add_business({ name, description, address }, auth.token, history));
  };
  const classes = useStyles();
  console.log();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <h3 className={classes.header}>فرم ورود</h3>
              <div className={classes.formInput}>
                <InputLabel required> نام کسب و کار</InputLabel>
                <TextField
                  id="outlined-name"
                  className={classes.textField}
                  value={name}
                  onChange={handleChange("name")}
                  margin="normal"
                />
                <InputLabel required> درباره‌ی کسب و کار</InputLabel>
                <TextField
                  id="outlined-desc"
                  className={classes.textField}
                  value={description}
                  onChange={handleChange("description")}
                  margin="normal"
                />

                <InputLabel required> آدرس</InputLabel>
                <TextField
                  type="password"
                  id="outlined-address"
                  className={classes.textField}
                  value={address}
                  onChange={handleChange("address")}
                  margin="normal"
                />
              </div>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={submit}
              >
                ایجاد کسب و کار
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
