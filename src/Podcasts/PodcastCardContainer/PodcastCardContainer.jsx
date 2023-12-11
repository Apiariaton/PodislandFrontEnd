import { useState, useEffect, useCallback } from "react";
import PageNumberNavigator from "../PageNumberNavigator/PageNumberNavigator";
import PodcastCard from "../PodcastCard/PodcastCard";
import { useSelector, useDispatch } from "react-redux";
import { podcastFilterSliceActions } from "../../UserBasketRedux/store/podcastFilter/podcastFilterSlice";
import { Fragment } from "react";
import styles from "./PodcastCardContainer.module.css";

function PodcastCardContainer(props) {

  let currentCards = useSelector((state) => state.podcastFilter.podcastFilterResults);
  
  const totalNumberOfCardsRD = Array.isArray(currentCards) && currentCards.length ? currentCards.length : 0;
  
  const [resultCards, setResultCards] = useState(currentCards);
  const [totalNumberOfCards, setTotalNumberOfCards] = useState(totalNumberOfCardsRD);
  const [currentCardRange, setCurrentCardRange] = useState([0, 6]);

  //Obtain current cards which match filters from redux
  useEffect(() => {setResultCards(currentCards);}, [currentCards]);
  
  //Obtain total number of cards from redux
  useEffect(() => {setTotalNumberOfCards(totalNumberOfCardsRD);}, [totalNumberOfCardsRD]);

  //Reset view index when a new search is conducted
  useEffect(() => {setCurrentCardRange([0, 6]);}, [totalNumberOfCardsRD]);
  
  //Sort cards by the active filter provided by bottom panel
  useEffect(() => {
    setResultCards((prevState) => {
      return [...prevState].sort((a, b) => {
        return String(a[props.activeSort]).localeCompare(
          String(b[props.activeSort])
        );
      });
    });
  }, [props.activeSort]);

  function changePage(pageNumber) {
    //Check that page number is less than the total number of pages
    if (
      0 < pageNumber && pageNumber <= (totalNumberOfCards % 6 === 0 ? totalNumberOfCards / 6 : Math.round(totalNumberOfCards / 6) + 1)
    ) 
    {
      //Check that the page is less than the final page
      if ((pageNumber - 1) * 6 < totalNumberOfCards - 6) 
      {
        let minCard = (pageNumber - 1) * 6;
        let maxCard = pageNumber * 6 - 1;
        setCurrentCardRange([minCard, maxCard]);
      } 
      //Check that the page number is the second-to-last page
      else if ((pageNumber - 1) * 6 == totalNumberOfCards - 6) 
      {
        let minCard = (pageNumber - 1) * 6;
        let maxCard = pageNumber * 6 - 1;
        setCurrentCardRange([minCard, maxCard]);
      } 
      //Check that the page number is the last page 
      else if (totalNumberOfCards - (pageNumber - 1) * 6 < 6) 
      {
        let minCard = (pageNumber - 1) * 6;
        let maxCard = totalNumberOfCards;
        setCurrentCardRange([minCard, maxCard]);
      }
    }
  }

  return (
    <Fragment>
      <div className={styles.bottom_panel_container}>
        <div className={styles.bottom_panel_inner_container}>
          {/* Sort cards by current card range*/}
          {currentCards != undefined
            ? resultCards
                .slice(currentCardRange[0], currentCardRange[1] + 1)
                .map((card, index) => (
                  <PodcastCard
                    key={index}
                    cardImage={card.artworkUrl600}
                    cardTitle={card.collectionName}
                    cardArtist={card.artistName}
                    cardGenres={card.genres.join(", ")}
                    cardLink={card.trackViewUrl}
                  ></PodcastCard>
                ))
            : null}
        </div>
      </div>
      <PageNumberNavigator changePage={changePage}></PageNumberNavigator>
    </Fragment>
  );
}

export default PodcastCardContainer;
