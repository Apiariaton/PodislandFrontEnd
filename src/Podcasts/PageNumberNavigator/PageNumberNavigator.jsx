import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styles from "./PageNumberNavigator.module.css";

function PageNumberNavigator(props) {
  let currentCards = useSelector(
    (state) => state.podcastFilter.podcastFilterResults
  );

  //Only compute length when currentCards exists
  const totalNumberOfCardsRD =
    Array.isArray(currentCards) && currentCards.length
      ? currentCards.length
      : 0;

  //Six results per page
  const [maxPageNumber, setMaxPageNumber] = useState(
    Math.ceil(totalNumberOfCardsRD) / 6
  );

  useEffect(() => {
    setMaxPageNumber(Math.ceil(totalNumberOfCardsRD / 6));
  }, [totalNumberOfCardsRD]);

  //Create array of page numbers to display
  const pageNumbers = Array.from({ length: maxPageNumber }, (_, i) => i + 1);
  //console.log(pageNumbers);

  //Display page numbers
  return (
    <div className={styles.pageNavigator}>
      {pageNumbers.map((pageNumber) => {
        // //console.log(pageNumber);
        return (
          <li
            className={styles.pageNumberLink}
            key={pageNumber}
            onClick={() => {
              props.changePage(pageNumber);
            }}
          >
            {pageNumber}
          </li>
        );
      })}
    </div>
  );
}

export default PageNumberNavigator;
