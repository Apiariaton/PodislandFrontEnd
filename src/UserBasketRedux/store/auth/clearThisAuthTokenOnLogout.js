import { authSliceActions } from "./authSlice";
import { errorMessageSliceActions } from "../errorMessage/errorMessageSlice";
import { clearUserDetails } from "../user/userActions";
const logoutUrl = import.meta.env.VITE_NODE_BE_URL + "/users/logout";


export default function clearThisAuthTokenOnLogout(currentAuthToken) {
    try {

      //Remove any pre-existing error messages 
      return async (dispatch) =>
      { 
      dispatch(errorMessageSliceActions.clearAuthErrorMessage());


      if (currentAuthToken !== null) 
      {
        //Send request to logout route
        const authTokenRemovalReq = await fetch(
         logoutUrl,
          {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + currentAuthToken,
            },
          }
        );
  
        //Remove auth token and user details from local storage and redux 
        if (authTokenRemovalReq.status === 200) 
        {
          console.log("Removal path triggered");
          dispatch(clearUserDetails());
          dispatch(authSliceActions.clearAuthToken());
          return;
        }
  
        //Handle error on unsuccessful logout
        else {
          const errorMessage = await authTokenRemovalReq.json();
          throw new Error({ error: errorMessage });
        }
      }
      else
      {
      dispatch(errorMessageSliceActions.setAuthErrorMessage(
        {authErrorMessage:"The authentication token provided does not exist. Please login in another window, then press logout to resolve this issue."}
      ));
      }
    } 
    }
    catch (e) {
      console.log(e);
      dispatch(errorMessageSliceActions.setAuthErrorMessage({authErrorMessage:e.message}));
    };
    
};