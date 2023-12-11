import { pastOrdersSliceActions } from "./pastOrdersSlice";
import { errorMessageSliceActions} from "../errorMessage/errorMessageSlice";


export default function obtainPastOrders(currentAuthToken) {
 
  return async (dispatch)=> {
  try {
    
    dispatch(errorMessageSliceActions.clearPastOrdersErrorMessage());

    const url = (import.meta.env.VITE_NODE_BE_URL) + "/past-orders";
    const getPastOrdersRequest = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + currentAuthToken,
        },
      }
    );

    if (getPastOrdersRequest.ok)
    {
      const getPastOrdersResponse = await getPastOrdersRequest.json();
      // console.log("These are the past orders:",getPastOrdersResponse);
      dispatch(pastOrdersSliceActions.getPastOrders({"pastOrders":getPastOrdersResponse}));
    }
    else 
    {
      throw new Error("Unable to fetch past orders...");
    }
  } catch (e) {
    console.log(e.message);
    dispatch(errorMessageSliceActions.setPastOrdersErrorMessage({pastOrdersError:e.message}));
  }
};
};
