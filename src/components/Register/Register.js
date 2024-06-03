import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import { signUp } from "../../Redux/Actions/Auth_Actions";
import { Loader } from "../../Assets/Loader/Loader";
import { RegExp } from "../../Helpers/RegExp/RegExp";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const regex = RegExp.REACT_APP_EMAILREGEX;
  const upperCase = RegExp.REACT_APP_UPPERCASEREGEX;
  const lowerCase = RegExp.REACT_APP_LOWERCASEREGEX;
  const digit = RegExp.REACT_APP_DIGITSREGEX;
  const specialChar = RegExp.REACT_APP_SPECIALCHARREGEX;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [open, setOpen] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    showPassword: false,
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
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
    var errors = {};

    if (formValues.firstName?.trim().length === 0) {
      errors.firstName = "First name is required.";
    }
    if (formValues.lastName?.trim().length === 0) {
      errors.lastName = "Last name is required.";
    }
    if (!formValues.email) {
      errors.email = "Email address is required.";
    } else if (!regex.test(formValues.email)) {
      errors.email = "The value is not a valid email address.";
    }
    if (formValues.password?.trim().length === 0) {
      errors.password = "The password is required.";
    } else if (!upperCase.test(formValues.password)) {
      errors.password =
        "The password must contain atleast one upper case letter.";
    } else if (!lowerCase.test(formValues.password)) {
      errors.password =
        "The password must contain altleast one lower case letter.";
    } else if (!digit.test(formValues.password)) {
      errors.password = "The password must contain atleast one digit.";
    } else if (!specialChar.test(formValues.password)) {
      errors.password =
        "The password must contain atleast one special character.";
    } else if (formValues.password.length < 8) {
      errors.password = "The password must be more than 8 characters.";
    }
    if (formValues.confirmpassword?.trim().length === 0) {
      errors.confirmpassword = "Confirm password is required.";
    } else if (formValues.confirmpassword !== formValues.password) {
      errors.confirmpassword = "Confirm password does not match.";
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
        await dispatch(signUp(values, navigate));
        setOpen(true);
        setErrorMsg(false);
        setMessage("User registered succesfully.");
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
  return (
    <div className="register w-100 d-flex align-items-center  justify-content-center text-center">
      <div className="registerCard card w-25 rounded  p-5 ">
        <h5 className="fw-bold">Sign Up</h5>
        <span className="fw-bold">
          Already have an account ? &nbsp;
          <Link to="/auth" className="link">
            Sign In
          </Link>
        </span>
        <form onSubmit={handleSubmit}>
          <div className="registerForm mt-5 w-100">
            <div className="d-flex flex-column flex-md-row">
              <div className="mb-3 me-0 me-md-2">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  onChange={handleChange}
                />
                <div className="w-100 text-start">
                  <span className="text-danger" style={{ fontSize: "12px" }}>
                    {formErrors.firstName}
                  </span>
                </div>
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  // className="mb-3"
                  onChange={handleChange}
                />
                <div className="w-100 text-start">
                  <span className="text-danger" style={{ fontSize: "12px" }}>
                    {formErrors.lastName}
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                fullWidth
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

            <div className="mb-3">
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                name="confirmpassword"
                type="password"
                fullWidth
                onChange={handleChange}
              />
              <div className="w-100 text-start">
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  {formErrors.confirmpassword}
                </span>
              </div>
            </div>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              className="muiContainedBtn"
            >
              {loading ? <Loader /> : "Sign Up"}
            </Button>
          </div>
        </form>
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
