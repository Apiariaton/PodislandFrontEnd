import styles from "./FilterButtonSet.module.css";
import { Fragment } from "react";
import FilterToggleButton from "./FilterButton";
import { useMemo, useState } from "react";

function FilterButtonSet(props) {
  return (
    <Fragment>
      <p className={styles.banner}>Choose up to three filters...</p>
      <div className={styles.filterButtonSet}>
        {props.filters.map((filter) => {
          // //console.log("filter:",filter);
          // //console.log("Filter field gets rendered");
          return (
            <FilterToggleButton
              key={filter}
              filterValue={filter}
              toggleFilter={props.toggleFilter}
            ></FilterToggleButton>
          );
        })}
      </div>
    </Fragment>
  );
}

export default FilterButtonSet;
