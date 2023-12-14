import styles from "./TopPanel.module.css";
import SearchBox from "../../Navigation/SearchBox/SearchBox";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { podFilters } from "../../Navigation/SearchBox/filterKeywordsList/podFilters";
import { podcastFilterSliceActions } from "../../UserBasketRedux/store/podcastFilter/podcastFilterSlice";
import { createFSQuery } from "../CreateServerFilterQuery/createFSQuery";
import createFilterURL from "../CreateServerFilterQuery/createFilterURL";
import { Snackbar, Alert } from "@mui/material";

function TopPanel() {
  const genreList = useSelector((state) => state.podcastFilter.activeFilters);
  const podcastName = useSelector((state) => state.podcastFilter.podcastName);
  // //console.log("PODCASTNAME", podcastName);
  const artistName = useSelector((state) => state.podcastFilter.artistName);
  const minMaxEpisodes = useSelector(
    (state) => state.podcastFilter.minMaxEpisodes
  );
  const userIsAuthenticated = useSelector((state) => state.auth.authToken);
  const searchValues = {
    genreList,
    podcastName,
    artistName,
    minMaxEpisodes,
  };
  let searchError = useSelector(
    (state) => state.errorMessage.podcastFilterErrorMessage
  );

  const filterURL = createFilterURL(userIsAuthenticated, searchValues);

  const configureRangeFilter = {
    //Provide a label for MUI Range Label
    valueLabelFormat: function valueLabelFormat(value) {
      return `${value} episodes`;
    },
    //Provide a gradient for MUI Range Slider
    calculateValue: function calculateValue(value) {
      if (value == 0) {
        return value;
      } else if (value < 600) {
        let newValue = Math.round(200 * (value / 600));
        let remainder = newValue % 5;
        return newValue + (5 - remainder);
      } else {
        if ((value * value) / 1000 < 1000) {
          let newValue = Math.round((value * value) / 1000);
          let remainder = newValue % 20;
          return newValue + (20 - remainder);
        }
        return value;
      }
    },
    //Provide labels and min/max values for either end of slider
    marks: [
      {
        value: 0,
        label: "Min Episodes",
      },
      {
        value: 1000,
        label: "Max Episodes",
      },
    ],
    updateMinMaxValues: podcastFilterSliceActions.changeMinMaxEpisodeRange,
  };

  return (
    <div className={styles.top_panel}>
      {/* Configure search box to store and sort podcast data via redux and filter creation function */}
      <SearchBox
        filters={podFilters}
        clearFilters={podcastFilterSliceActions.clearFilters}
        toggleFilter={podcastFilterSliceActions.toggleFilterKeyword}
        mainSearchInputPH={" Podcast Name - Exact search "}
        secondSearchInputPH={"Artist Name - Exact search"}
        updateFirstTextInput={podcastFilterSliceActions.changePodcastName}
        updateSecondTextInput={podcastFilterSliceActions.changeArtistName}
        configureRangeFilter={configureRangeFilter}
        executeSearch={createFSQuery}
        filterURL={filterURL}
        userIsAuthenticated={userIsAuthenticated}
      ></SearchBox>

      {/* Handle errors */}
      <Snackbar open={Array.isArray(searchError) && searchError.length > 0}>
        <Alert
          variant="filled"
          severity="warning"
          sx={{ width: "100%", fontFamily: "Almarai, sans-serif" }}
        >
          Something went wrong...
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TopPanel;
