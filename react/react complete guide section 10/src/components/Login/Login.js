import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const passwordInitialState = {
    password: "",
    isValid: null,
  };
  const emailInitialState = {
    email: "",
    isValid: null,
  };
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredPassword, passwordDispatch] = useReducer(
    passwordReducer,
    passwordInitialState
  );

  const [enteredEmail, dispatch] = useReducer(reducer, emailInitialState);

  const { isValid: emailIsValid } = enteredEmail;
  const { isValid: passwordIsValid } = enteredPassword;

  useEffect(() => {
    // console.log("The page is re-rendering.");

    let identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
      console.log("form validity checked");
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  function reducer(state, action) {
    if (action.type === "change_email") {
      if (action.value.includes("@")) {
        return { email: action.value, isValid: true };
      } else {
        return {
          email: action.value,
          isValid: false,
        };
      }
    } else if (action.type === "input_blur") {
      return {
        email: state.email,
        isValid: state.email.includes("@"),
      };
    }
  }

  function passwordReducer(state, action) {
    if (action.type === "change_password") {
      if (action.value.length > 6) {
        return { password: action.value, isValid: true };
      } else {
        return {
          password: action.value,
          isValid: false,
        };
      }
    } else if (action.type === "input_blur") {
      return {
        password: state.password,
        isValid: state.password.trim().length > 6,
      };
    }
  }

  const emailChangeHandler = (event) => {
    dispatch({ type: "change_email", value: event.target.value });

    // setFormIsValid(enteredPassword.isValid && event.target.value.includes("@"));
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({ type: "change_password", value: event.target.value });

    // setFormIsValid(
    //   enteredEmail.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatch({ type: "input_blur" });
  };

  const validatePasswordHandler = () => {
    passwordDispatch({ type: "input_blur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail.email, enteredPassword.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            enteredEmail.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            enteredPassword.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
