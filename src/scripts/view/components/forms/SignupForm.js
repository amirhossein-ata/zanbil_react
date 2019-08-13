import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { InputLabel } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { signupRequest } from "../../../core/actions/auth";

export default ({ dispatch, auth, history, revertForm }) => {
  if (auth && auth.isAuthenticated) {
    history.push("/");
  }
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const handleChange = field => e => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "phone_number") {
      setPhoneNumber(e.target.value);
    } else if (field === "type") {
      setType(e.target.value);
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
        type
      })
    );
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="center" className="form__container">
          <Grid item xs={8}>
            <h2 className="form__title">فرم ثبت‌نام</h2>
            <div className="form__field">
              <InputLabel required className="form__label">
                {" "}
                نام
              </InputLabel>
              <TextField
                id="outlined-name"
                className="form__input"
                value={name}
                onChange={handleChange("name")}
                margin="normal"
              />
              <InputLabel required className="form__label">
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
              <InputLabel className="form__label" required>
                {" "}
                شماره تلفن همراه
              </InputLabel>
              <TextField
                id="outlined-name"
                className="form__input"
                value={phone_number}
                onChange={handleChange("phone_number")}
                margin="normal"
              />
              <InputLabel className="form__label" required>
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
              <InputLabel className="form__label" required>
                {" "}
                تکرار رمز عبور
              </InputLabel>
              <TextField
                type="password"
                id="outlined-name"
                className="form__input"
                value={password_confirmation}
                onChange={handleChange("password_confirmation")}
                margin="normal"
              />
              <br />
              <FormControl component="fieldset">
                <FormLabel component="legend" className="form__label">
                  نوع حساب
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  className="form__input"
                  value={type}
                  onChange={handleChange("type")}
                  row
                >
                  <FormControlLabel
                    value="manager"
                    control={<Radio />}
                    label="مدیریت"
                  />
                  <FormControlLabel
                    value="customer"
                    control={<Radio />}
                    label="مشتری"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <button
              variant="outlined"
              color="primary"
              className="form__button"
              onClick={submit}
            >
              ثبت‌نام
            </button>
            <p className="form__revert" onClick={() => revertForm(true)}>
              ورود به حساب
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
