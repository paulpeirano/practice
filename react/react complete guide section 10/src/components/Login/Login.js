import React, { useState, useEffect, useReducer, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const passwordInitialState = {
    value: "",
    isValid: null,
  };
  const emailInitialState = {
    value: "",
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
        return { value: action.value, isValid: true };
      } else {
        return {
          value: action.value,
          isValid: false,
        };
      }
    } else if (action.type === "input_blur") {
      return {
        value: state.value,
        isValid: state.value.includes("@"),
      };
    }
  }

  function passwordReducer(state, action) {
    if (action.type === "change_password") {
      if (action.value.length > 6) {
        return { value: action.value, isValid: true };
      } else {
        return {
          value: action.value,
          isValid: false,
        };
      }
    } else if (action.type === "input_blur") {
      return {
        value: state.value,
        isValid: state.value.trim().length > 6,
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
    if (formIsValid) {
      authCtx.onLogin(enteredEmail.email, enteredPassword.password);
    } else if (!emailIsValid) {
      emailInputRef.current.activate();
    } else {
      passwordInputRef.current.activate();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          controlClass={classes.control}
          invalidClass={classes.invalid}
          value={enteredEmail}
          isValid={enteredEmail.isValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          id={"Email"}
          type={"text"}
          label={"E-Mail"}
        />
        <Input
          ref={passwordInputRef}
          controlClass={classes.control}
          invalidClass={classes.invalid}
          value={enteredPassword}
          isValid={enteredPassword.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          id={"Password"}
          type={"password"}
          label={"Password"}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
