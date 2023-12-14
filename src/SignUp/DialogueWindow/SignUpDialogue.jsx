import styles from "./SignUpDialogue.module.css";
import SignUpTitle from "./SignUpTitle";
import SignUpDesc from "./SignUpDesc";
import SignUpButton from "./SignUpButton";
import SignUpField from "./SignUpField";
import SignUpSubTitle from "./SignUpSubTitle";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { useState, prevState, useEffect, Fragment } from "react";
import retrieveAuthTokenLoginOrCreate from "../../UserBasketRedux/store/auth/retrieveAuthTokenLoginOrCreate";
import {Snackbar,Alert} from "@mui/material";

function SignUpDialogue(props) {
  const [validForm, setValidForm] = useState({
    Username: false,
    FName: false,
    Email: false,
    Password: false,
  });

  const [formIsSendable,setFormIsSendable] = useState(false);

  const [fieldData,setFieldData] = useState({
    Username: "",
    FName: "",
    Email: "",
    Password: "",
  });

  const [signUpIsSuccess,setSignUpIsSuccess] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let errorSigningUp = useSelector(state=>state.errorMessage.authErrorMessage[0]);



  async function signUp()
  {
  const {Username,FName,Email,Password} = fieldData;
  const nameArray = FName.split(" ");
  const firstName = nameArray[0];
  const lastName = nameArray[1];

  const newUserProfile = {
    "username" : Username,
    "firstName" : firstName,
    "lastName" : lastName,
    "email" : Email,
    "password": Password,
    "age": 25,
    "googleAccount": "false"
  };

  console.log(newUserProfile);
  const signUpWasSuccessful = await (dispatch(retrieveAuthTokenLoginOrCreate(newUserProfile,"accountCreation")));
  console.log(signUpWasSuccessful);
  signUpWasSuccessful ? setSignUpIsSuccess(true) : setSignUpIsSuccess(false); 
  setTimeout(()=>{navigate("/")},3000);
 
  }

  useEffect(()=>{setFormIsSendable((Object.values(validForm).filter(value => value == false).length == 0))},[setFormIsSendable,validForm]);

  return (
    <Fragment>
    <div className={styles.signUpDialogue}>
      <SignUpTitle title="Sign Up" />
      
      <SignUpDesc desc="Create a Podisland account today to explore your favourite podcasts for free" />
      <SignUpField
        placeholder={"Username"}
        centralDataKey={"Username"}
        validateField={(isValid) => {
          setValidForm((prevState) => ({ ...prevState, Username: isValid }));
        }}
        updateCentralFieldData={setFieldData}
        checkField={(value) => {
          return validator.isAlphanumeric(value);
        }}
        errorMessage="Enter a username that contains only numbers and letters.Spaces are not allowed. (0-9A-Za-z)"
      />

      <SignUpField
        placeholder={"Full Name"}
        centralDataKey={"FName"}
        validateField={(isValid) => {
          setValidForm((prevState) => ({ ...prevState, FName: isValid }));
        }}
        checkField={(value) => {
          return (
            !validator.isEmpty(value) &&
            validator.isAlpha(value, "en-GB", { ignore: "-' " }) && 
            value.split(" ").filter(value => !validator.isEmpty(value)).length >= 2)
        }}
        updateCentralFieldData={setFieldData}
        errorMessage="Enter a first and last name, separated by a space, that contains letters only...(A-Z a-z)"
      />

      <SignUpField
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

      <SignUpField
        placeholder={"Password"}
        centralDataKey={"Password"}
        validateField={(isValid) => {
          setValidForm((prevState) => ({ ...prevState, Password: isValid }));
        }}
        checkField={(value) => {
          return validator.isStrongPassword(value);
        }}
        updateCentralFieldData={setFieldData}
        errorMessage="Please provide a password with at least one uppercase letter, one lowercase letter, one symbol and one number...(A-Za-z1-9!#?-.)"

      />

      <SignUpButton
        buttonName={"Create account"}
        signUpIsSuccess={signUpIsSuccess}
        setSignUpIsSuccess={setSignUpIsSuccess}
        isDisabled={
            !formIsSendable
        }
        triggerSignUp={() => {
            signUp();
        }}
        
      />
    <div className={styles.errorMessage}>{errorSigningUp}</div>
    </div>
    <Snackbar open={signUpIsSuccess} autoHideDuration={6000} onClose={()=>setSignUpIsSuccess(null)}><Alert variant="filled" severity="success" onClose={()=>setSignUpIsSuccess(null)} sx={{ width: '100%' }}>Account created successfully...</Alert></Snackbar>
    <Snackbar open={signUpIsSuccess==false} autoHideDuration={6000} onClose={()=>setSignUpIsSuccess(null)}><Alert variant="filled" severity="warning" onClose={()=>setSignUpIsSuccess(null)} sx={{ width: '100%', fontFamily: "Almarai, sans-serif" }}>There was an error signing in...</Alert></Snackbar>
    <div></div>
    </Fragment>
  );
}

export default SignUpDialogue;
