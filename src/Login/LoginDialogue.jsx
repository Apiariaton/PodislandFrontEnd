import styles from "./LoginDialogue.module.css";
import LoginTitle from "./LoginTitle";
import LoginDesc from "./LoginDesc";
import LoginButton from "./LoginButton";
import LoginField from "./LoginField";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, prevState, useEffect, Fragment } from "react";
import retrieveAuthTokenLoginOrCreate from "../UserBasketRedux/store/auth/retrieveAuthTokenLoginOrCreate";
import { Snackbar, Alert } from "@mui/material";

function LoginDialogue(props) {
  const [validForm, setValidForm] = useState({
    Email: false,
    Password: false,
  });

  const [formIsSendable, setFormIsSendable] = useState(false);

  const [fieldData, setFieldData] = useState({
    Email: "",
    Password: "",
  });

  const [LoginIsSuccess, setLoginIsSuccess] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let errorLoggingIn = useSelector(
    (state) => state.errorMessage.authErrorMessage[0]
  );

  async function Login(loginDetails = fieldData) {
    const { Email, Password } = loginDetails;

    const loginCredentials = {
      email: Email,
      password: Password,
    };

    //console.log(loginCredentials);
    const LoginWasSuccessful = await dispatch(
      retrieveAuthTokenLoginOrCreate(loginCredentials, "login")
    );
    //console.log(LoginWasSuccessful);
    LoginWasSuccessful ? setLoginIsSuccess(true) : setLoginIsSuccess(false);
    if (LoginWasSuccessful) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }

  useEffect(() => {
    setFormIsSendable(
      Object.values(validForm).filter((value) => value == false).length == 0
    );
  }, [setFormIsSendable, validForm]);

  return (
    <Fragment>
      <div className={styles.LoginDialogue}>
        <LoginTitle title="Login" />
        <LoginDesc desc="Login to your Podisland account now" />
        <button
          className={styles.testAccountLogin}
          onClick={() => {
            Login({
              Email: "wholder321@gmail.com",
              Password: "WEBSlinger54321!!",
            });
          }}
        >
          Login with test account...
        </button>

        <LoginField
          placeholder={"Email"}
          centralDataKey={"Email"}
          validateField={(isValid) => {
            setValidForm((prevState) => ({ ...prevState, Email: isValid }));
          }}
          checkField={(value) => {
            return validator.isEmail(value);
          }}
          updateCentralFieldData={setFieldData}
          errorMessage="Please enter a valid email address..."
        />

        <LoginField
          placeholder={"Password"}
          centralDataKey={"Password"}
          validateField={(isValid) => {
            setValidForm((prevState) => ({ ...prevState, Password: isValid }));
          }}
          checkField={(value) => {
            return validator.isStrongPassword(value);
          }}
          updateCentralFieldData={setFieldData}
          errorMessage="Please provide the strong password (min 8 characters) which contains at least one uppercase letter, one lowercase letter and one symbol you used to create your account..."
        />

        <LoginButton
          buttonName={"Login"}
          LoginIsSuccess={LoginIsSuccess}
          setLoginIsSuccess={setLoginIsSuccess}
          isDisabled={!formIsSendable}
          triggerLogin={() => {
            Login(fieldData);
          }}
        />
        <div className={styles.LoginButtonContainer}>
          <button
            className={styles.LoginButton}
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            Sign Up
          </button>
        </div>

        <div className={styles.errorMessage}>{errorLoggingIn}</div>
      </div>
      <Snackbar
        open={LoginIsSuccess}
        autoHideDuration={6000}
        onClose={() => setLoginIsSuccess(null)}
      >
        <Alert
          variant="filled"
          severity="success"
          onClose={() => setLoginIsSuccess(null)}
          sx={{ width: "100%" }}
        >
          Successfully logged in...
        </Alert>
      </Snackbar>
      <Snackbar
        open={LoginIsSuccess == false}
        autoHideDuration={6000}
        onClose={() => setLoginIsSuccess(null)}
      >
        <Alert
          variant="filled"
          severity="warning"
          onClose={() => setLoginIsSuccess(null)}
          sx={{ width: "100%", fontFamily: "Almarai, sans-serif" }}
        >
          There was an error logging in...
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default LoginDialogue;
