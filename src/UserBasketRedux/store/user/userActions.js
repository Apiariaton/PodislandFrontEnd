import { userSliceActions } from "./userSlice";
import { errorMessageSliceActions } from "../errorMessage/errorMessageSlice";
import setLocalStorage from "../../localStorageFunctions/setLocalStorage";

export function setUserDetails(loginDetails) {

    console.log("Set User Details called...");
    console.log(loginDetails);

    setLocalStorage("username",loginDetails["username"]);
    setLocalStorage("accountCreationDate",loginDetails["accountCreationDate"]);
    setLocalStorage("userEmail",loginDetails["email"]);

    return (dispatch) =>
    {
    //Clear pre-existing user merror message
    dispatch(errorMessageSliceActions.clearUserErrorMessage());

    //Store user details via redux state
    try {   
    dispatch(
      userSliceActions.getUserData({
        username: loginDetails["username"],
        email: loginDetails["email"],
        accountCreationDate: loginDetails["accountCreationDate"],
      })
    );
    }
    catch (e) {
      console.log(e);
      dispatch(errorMessageSliceActions.setUserErrorMessage(e.message));
      return null;
  } 
  }
};


export function clearUserDetails() {
  
    //Remove user details from redux state
  localStorage.removeItem("username");
  localStorage.removeItem("accountCreationDate");
  localStorage.removeItem("authToken");
  localStorage.removeItem("userEmail");


  return (dispatch)=> {
  try {
    dispatch(errorMessageSliceActions.clearUserErrorMessage());
    dispatch(userSliceActions.clearUserData());
  } 
  catch (e) 
  {
    console.log(e);
    dispatch(errorMessageSliceActions.setUserErrorMessage(e.message));
    return null;
  }
  }
};
