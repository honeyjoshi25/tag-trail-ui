import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router";
import { signIn } from "../../Redux/Actions/Auth_Actions";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    dispatch(signIn(values, navigate));
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = () =>
    console.log("Google Sign In was unsuccessful. Try again later");
  // const googleFailure = (error) => {
  //   console.log(error, 'error')
  //   console.log('failed!!!')
  // }

  return (
    <div className="login w-100 d-flex align-items-center  justify-content-center text-center">
      <div className="loginCard w-25 card p-5 rounded">
        <h5 className="fw-bold">Sign In</h5>
        <span className="fw-bold">
          Don't have an account ? &nbsp;
          <Link to="/signUp" className="link">
            Sign Up
          </Link>
        </span>

        <div className="loginForm mt-5 w-100">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            value={values.email}
            fullWidth
           className="mb-3 w-100"
            onChange={handleChange}
          />
          <FormControl
            className="w-100 mb-3"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              fullWidth
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            type="submit"
            className="muiContainedBtn mb-3"
          >
            Sign in
          </Button>
          <GoogleLogin
            //994095431122-gv0ajpj1k78h40h1o8v6g1b9abqboo3l.apps.googleusercontent.com
            clientId="994095431122-gv0ajpj1k78h40h1o8v6g1b9abqboo3l.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                variant="outlined"
                fullWidth
                style={{ marginBottom: 10 }}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="muiOutlinedBtn"
              >
                Sign in with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>
    </div>
  );
};
