import { authSliceActions } from "./authSlice";
import { errorMessageSliceActions } from "../errorMessage/errorMessageSlice";
import setLocalStorage from "../../localStorageFunctions/setLocalStorage";
import getLocalStorage from "../../localStorageFunctions/getLocalStorage";
import { setUserDetails, clearUserDetails } from "../user/userActions";

const loginUrl = import.meta.env.VITE_NODE_BE_URL + "/users/login";
const createAccountUrl = import.meta.env.VITE_NODE_BE_URL + "/users/new";

export default function retrieveAuthTokenOnCreateOrLogin(
  loginDetails,
  accountUpdateType = "login"
) {
  // console.log("These are the login details I am using:");
  // console.log(loginDetails);
  return async (dispatch) => {
    try {
      dispatch(errorMessageSliceActions.clearAuthErrorMessage());
      console.log(loginDetails);
      const authTokenRequest =
        accountUpdateType == "accountCreation"
          ? await fetch(
              //Create new user account
              createAccountUrl,
              {
                body: JSON.stringify(loginDetails),
                headers: {"Content-Type":"application/json"},
                method: "POST",
              }
            )
          : await fetch(
              //Login to existing account
              loginUrl,
              {
                body: JSON.stringify(loginDetails),
                headers: {"Content-Type":"application/json"},
                method: "POST",
              }
            );

      const authTokenResponse = await authTokenRequest.json();
      // console.log(authTokenResponse);
      const authToken = authTokenResponse["token"];
      // console.log(authToken);
      // console.log("Status:",authTokenRequest.status);

      //Valid auth token received -
      if (
        (authTokenRequest.status === 201 || authTokenRequest.status === 200)  &&
        authToken !== undefined
      ) {
        console.log("SAVE DATA PATH TRIGGERED");
        // Store auth token locally
       
        
        const userDetails = authTokenResponse["user"];
        console.log(userDetails);
        const {
          email: userEmail,
          username: username,
          createdAt: accountCreationDate,
        } = userDetails;

        //Store key info in local storage
        setLocalStorage("authToken",authToken);

        //Store user details via redux state
        dispatch(setUserDetails({
          email: userEmail,
          username: username,
          accountCreationDate: accountCreationDate,
        }));

        dispatch(errorMessageSliceActions.clearAuthErrorMessage());

        dispatch(authSliceActions.setAuthToken({"authToken":authToken}));
        return true;
      }

      // Server error on auth token request
      else {
        dispatch(
          errorMessageSliceActions.setAuthErrorMessage(
            {authErrorMessage : authTokenResponse.error}
          )
        );
        return false;
      }
    } catch (e) {
      dispatch(errorMessageSliceActions.setAuthErrorMessage( {authErrorMessage : "A user already exists with this email or username..."}));
      return false;
    }
  };
}
