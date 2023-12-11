import { authSliceActions } from "../store/auth/authSlice";
import { clearUserDetails } from "../store/user/userActions";

export function removePersonalDataFromLocalStorage(){

    localStorage.clear();

    return (dispatch)=>{
        dispatch(authSliceActions.clearAuthToken());
        dispatch(clearUserDetails());
    }
};