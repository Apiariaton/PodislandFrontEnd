import { createSlice } from "@reduxjs/toolkit";
import { podFilters } from "../../../Navigation/SearchBox/filterKeywordsList/podFilters";

const initialPodcastFilterSlice = {
  allFilters: podFilters.reduce((acc, filterKey) => {
    acc[filterKey] = false;
    return acc;
  }, {}),
  activeFilters: [],
  minMaxEpisodes: { min: 0, max: 1000 },
  artistName: null,
  podcastFilterResults: [],
};

// console.log(initialPodcastFilterSlice);

const podcastFilterSlice = createSlice({
  name: "podcastFilter",
  initialState: initialPodcastFilterSlice,
  reducers: {
    toggleFilterKeyword(state, action) {
      if (
        action.payload.isActive == true &&
        !state.activeFilters.includes([action.payload.filterValue])
      ) {
        state.activeFilters.push(action.payload.filterValue);
      } else {
        state.activeFilters = state.activeFilters.filter(
          (filterWord) => filterWord.toString() != action.payload.filterValue
        );
      }
      state.allFilters[action.payload.filterValue] = action.payload.isActive;
    },
    changeMinMaxEpisodeRange(state, action) {
      state.minMaxEpisodes.min = action.payload.min;
      state.minMaxEpisodes.max = action.payload.max;
    },
    changeArtistName(state, action) {
      state.artistName = action.payload;
    },
    changePodcastName(state, action) {
      state.podcastName = action.payload;
    },
    clearFilters(state, action) {
      state.allFilters = podFilters.reduce((acc, filterKey) => {
        acc[filterKey] = false;
        return acc;
      }, {});
      state.activeFilters = [];
    },
    storeQueryResults(state, action) {
      state.podcastFilterResults = action.payload.results.matchingPodcasts;
    },
  },
});

export default podcastFilterSlice.reducer;
export const podcastFilterSliceActions = podcastFilterSlice.actions;
