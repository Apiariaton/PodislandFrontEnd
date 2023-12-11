import styles from "./BottomPanel.module.css";
import PodcastCard from "../PodcastCard/PodcastCard";
import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import PodcastCardContainer from "../PodcastCardContainer/PodcastCardContainer";

function BottomPanel() {

  const [currentCards, setCurrentCards] = useState([]);
  const podcastCards = useSelector(
    (state) => state.podcastFilter.podcastFilterResults
  );
  // Sort keyword against which cards in podcast container will be sorted
  const [activeSortFilter, setActiveSortFilter] = useState("");

  useEffect(() => {setCurrentCards(podcastCards);}, [podcastCards]);

  const resultSummary = currentCards == undefined || currentCards.length == 0 ? "No results found" : `${currentCards.length} results found...`;

  function sortByHandler(event) {
    setActiveSortFilter((prevState) => event.target.value);
  }

  return (
    <Fragment>
      <div className={styles.resultsBar}>
        <div className={styles.containerLeft}>{resultSummary}</div>
        <div className={styles.containerRight}>
          {/* Dropdown menu */}
          <label htmlFor="sort">Sort By:</label>
          <select
            name="sort"
            onChange={(event) => {
              sortByHandler(event);
            }}
          >
          {/* Dropdown options */}
            <option value="trackCount">Number of Episodes</option>
            <option value="collectionName">Podcast Name</option>
            <option value="artistName">Artist Name</option>
          </select>
        </div>
      </div>
      <PodcastCardContainer activeSort={activeSortFilter} />
    </Fragment>
  );
}

export default BottomPanel;
