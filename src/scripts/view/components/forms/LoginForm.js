import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { InputLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { loginRequest } from "../../../core/actions/auth";

export default ({ dispatch, auth, history, revertForm }) => {
  if (auth && auth.isAuthenticated) {
    history.push("/");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = field => e => {
    if (field === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const submit = () => {
    dispatch(loginRequest({ email, password }));
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="center" className="form__container">
          <Grid item xs={10} justify="center">
            <h2 className="form__title">فرم ورود</h2>
            <div className="form__field">
              <InputLabel className="form__label" required>
                {" "}
                ایمیل
              </InputLabel>
              <TextField
                id="outlined-name"
                className="form__input"
                value={email}
                onChange={handleChange("email")}
                margin="normal"
              />
              <InputLabel required className="form__label">
                {" "}
                رمز عبور
              </InputLabel>
              <TextField
                type="password"
                id="outlined-name"
                className="form__input"
                value={password}
                onChange={handleChange("password")}
                margin="normal"
              />
            </div>
            <button
              variant="contained"
              color="primary"
              className="form__button"
              onClick={submit}
            >
              ورود
            </button>
            <p className="form__revert" onClick={() => revertForm(false)}>
              ساخت حساب جدید
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
