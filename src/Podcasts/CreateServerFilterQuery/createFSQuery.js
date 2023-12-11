import {useSelector} from 'react-redux';
import { podcastFilterSliceActions } from '../../UserBasketRedux/store/podcastFilter/podcastFilterSlice';
import { errorMessageSliceActions } from '../../UserBasketRedux/store/errorMessage/errorMessageSlice';

export function createFSQuery(userIsAuthenticated,filterURL){

return async (dispatch) => {
  try
  {
    dispatch(errorMessageSliceActions.clearPodcastFilterErrorMessage());

    const resultsRequest = await fetch(filterURL,
        {
            method: "GET",
            headers: {
              "Authorization": "Bearer " + userIsAuthenticated,
            },
          }
    );

    //Handle response, storing cards via redux
    if (resultsRequest.ok)
    {
    const results = await resultsRequest.json();
    dispatch(podcastFilterSliceActions.storeQueryResults({"results":results}));
    }
    else
    {
      dispatch(errorMessageSliceActions.setPodcastFilterErrorMessage({podcastFilterErrorMessage:e.message}))
    }

  }
  catch (e)
  {
    console.log(e);
    dispatch(errorMessageSliceActions.setPodcastFilterErrorMessage({podcastFilterErrorMessage:e.message}))
  }
  };

};


