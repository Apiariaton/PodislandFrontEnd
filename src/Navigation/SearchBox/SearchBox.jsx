import styles from "./SearchBox.module.css";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterButtonSet from "./keywordToggleFilters/FilterButtonSet";
import SecondSearchInput from "./searchBar/SecondSearchInput";
import FirstSearchInput from "./searchBar/FirstSearchInput";
import ValueRange from "./valueRangeFilter/ValueRange";
import { CircularProgress } from "@mui/material";
import validator from "validator";
import {Snackbar,Alert} from "@mui/material";
import getLocalStorage from "../../UserBasketRedux/localStorageFunctions/getLocalStorage";


function SearchBox(props) {
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [isDisabled,setIsDisabled] = useState(true);

  const dispatch = useDispatch();
  const searchBoxClasses = `${styles.baseSearchBox} ${
    advancedSearchOpen ? styles.searchBoxAS : styles.searchBox
  }`;

  const currentAuthToken = useSelector(state=>state.auth.authToken);

  const closeASHandler = () => {
    setAdvancedSearchOpen(false);
    dispatch(props.clearFilters());
    //Set filters via redux dispatch function to false
  };

  //Only permit searches if user is logged in
  useEffect(()=>{currentAuthToken != null && !validator.isEmpty(currentAuthToken) ? setIsDisabled(false) : setIsDisabled(true)},[currentAuthToken]);

  const openASHandler = () => {
    setAdvancedSearchOpen(true);
  };

  const triggerSearchHandler = () => {
    setIsLoading(true);
    dispatch(props.executeSearch(props.userIsAuthenticated,props.filterURL));
    setIsLoading(false);
  }

  //Search box
  return (
    <div className={searchBoxClasses}>
      <div className={styles.closeASHeaderBox}>
        {advancedSearchOpen && (
          <button
            className={styles.closeAdvancedSearch}
            onClick={() => closeASHandler()}
          >
            COLLAPSE ADVANCED SEARCH
          </button>
        )}
      </div>

      <FirstSearchInput
        updateFirstTextInput={props.updateFirstTextInput}
        placeholder={props.mainSearchInputPH}
      ></FirstSearchInput>

      {advancedSearchOpen && (
        <SecondSearchInput
          secondSearchInputPH={props.secondSearchInputPH}
          updateSecondTextInput={props.updateSecondTextInput}
        />
      )}


      {advancedSearchOpen && (
        <div className={styles.filterField}>
          <FilterButtonSet
            filters={props.filters}
            toggleFilter={props.toggleFilter}
          />
        </div>
      )}

        {/*console.log(props.configureRangeFilter)*/}
      {advancedSearchOpen && <ValueRange configureRangeFilter={props.configureRangeFilter}></ValueRange>
      }

      {!advancedSearchOpen && (
        <button
          className={`${styles.baseButton} ${styles.openAdvancedSearch}`}
          onClick={() => openASHandler()}
        >
          ADVANCED SEARCH
        </button>
      )}

      <button disabled={isDisabled} className={`${styles.baseButton} ${styles.submitButton} ${isDisabled ? styles.isDisabled : ""}`} onClick={(event)=>triggerSearchHandler(event)}>
        {isLoading == false && "SEARCH"}{isLoading && <CircularProgress/>}
      </button>

      {/* Error message */}
      <Snackbar
        open={isDisabled}
      >
        <Alert
          variant="filled"
          severity="warning"
          sx={{ width: "100%", fontFamily: "Almarai, sans-serif" }}
        >
          Please login or sign up to search podcasts...
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SearchBox;
