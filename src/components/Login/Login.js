import React, { useState } from "react";
// import { GoogleLogin } from "react-google-login";
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
import { RegExp } from "../../Helpers/RegExp/RegExp";
import { Loader } from "../../Assets/Loader/Loader";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const regex = RegExp.REACT_APP_EMAILREGEX;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.email) {
      errors.email = "Email address is required.";
    } else if (!regex.test(formValues.email)) {
      errors.email = "The value is not a valid email address.";
    }
    if (formValues.password.trim().length === 0) {
      errors.password = "The password is required.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(values);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        await dispatch(signIn(values, navigate));
        setOpen(true);
        setErrorMsg(false);
        setMessage("Logged in succesfully.");
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error);
        setOpen(true);
        setErrorMsg(true);
        setMessage(error.message);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }
  };

  // const googleSuccess = async (res) => {
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({ type: "AUTH", data: { result, token } });
  //     navigate("/");
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const googleError = () =>
  //   console.log("Google Sign In was unsuccessful. Try again later");
  // // const googleFailure = (error) => {
  // //   console.log(error, 'error')
  // //   console.log('failed!!!')
  // // }

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
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                value={values.email}
                fullWidth
                className="w-100"
                onChange={handleChange}
              />
              <div className="w-100 text-start">
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  {formErrors.email}
                </span>
              </div>
            </div>
            <FormControl className="w-100 mb-3" variant="outlined">
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
              <div className="w-100 text-start">
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  {formErrors.password}
                </span>
              </div>
            </FormControl>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              className="muiContainedBtn mb-3"
            >
              {loading ? <Loader /> : "Sign in"}
            </Button>
          </form>
          {/* <GoogleLogin
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
          /> */}
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          severity={errorMsg ? "error" : "success"}
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
