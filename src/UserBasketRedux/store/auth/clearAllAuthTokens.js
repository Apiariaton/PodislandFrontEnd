import { authSliceActions } from "./authSlice";
import {errorMessageSliceActions} from "../errorMessage/errorMessageSlice";

import { clearUserDetails } from "../user/userActions";


const logoutAllUrl = import.meta.env.VITE_NODE_BE_URL + "/users/logoutAll";



export default function clearAllAuthTokensOnLogout(currentAuthToken) {
    
  return async (dispatch) => {
  try {

      //Remove any pre-existing error messages  
      dispatch(errorMessageSliceActions.clearAuthErrorMessage());


      if (currentAuthToken !== null)
      {
        //Send request to logout all route
        const authTokenRemovalReq = await fetch(
            logoutAllUrl,
          {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + currentAuthToken,
            },
          }
        );
  
        //Remove auth tokens and user details from local storage + redux state 
        if (authTokenRemovalReq.status === 200) 
        {
          dispatch(clearUserDetails());
          while (localStorage.getItem("authToken"))
          {
          localStorage.removeItem("authToken");
          }
          localStorage.removeItem("userEmail");
          localStorage.removeItem("basket");
          return dispatch(authSliceActions.clearAuthToken());
        }
  
        //Handle and display server error on unsuccessful logout
        else {
          const errorMessage = await authTokenRemovalReq.json();
          throw new Error({ error: errorMessage });
        }
      }
      dispatch(errorMessageSliceActions.setAuthErrorMessage(
        {authErrorMessage:"The authentication token provided does not exist. Please login in another window, then press logout all to resolve this issue."
    }));
    } 
    catch (e) 
    {
      console.log(e);
      dispatch(errorMessageSliceActions.setAuthErrorMessage({authErrorMessage:e.message}));
    }
  }
};
  