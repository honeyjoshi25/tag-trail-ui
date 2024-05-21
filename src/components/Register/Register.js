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

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    showPassword: false,
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
    dispatch(signUp(values, navigate));
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
        <div className="registerForm mt-5 w-100">
          <div className="d-flex flex-column flex-md-row">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              name="firstName"
             className="mb-3 me-0 me-md-2"
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              name="lastName"
              className="mb-3"
              onChange={handleChange}
            />
          </div>

          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            fullWidth
           className="mb-3"
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
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            name="confirmpassword"
            type="password"
            fullWidth
            className="mb-3"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            type="submit"
            className="muiContainedBtn"
          >
            Sign Up
          </Button>
          
        </div>
      </div>
    </div>
  );
};
