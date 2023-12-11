import { basketSliceActions } from "./basketSlice";
import {errorMessageSliceActions} from "../errorMessage/errorMessageSlice";
import { plMaxQuantityPerOrder } from "./productList";
import { useSelector } from "react-redux";
import getLocalStorage from "../../localStorageFunctions/getLocalStorage";
import setLocalStorage from "../../localStorageFunctions/setLocalStorage";

export function removeItemFromBasket(newItemObject) {
  
  const itemName = newItemObject["ProductName"];
  const itemQuantity = newItemObject["ProductQuantity"];
  
  

  return (dispatch,getState)=>{

  //Get current number of the same item within basket
  let itemNumberWithinBasket = 0;
  
  //Exclude undefined items
  const currentState = getState();
  // console.log("currentState",currentState);

  dispatch(errorMessageSliceActions.clearBasketErrorMessage());


  if (currentState.basket.basket.filter((basketItem)=>basketItem != undefined).length >= 1)
  {
    
      //Verify whether item already in basket
      const sameItemFound = currentState.basket.basket.find((basketItem)=>basketItem["name"] == itemName);
      // console.log(sameItemFound);

      //If so, update quantity
      if (sameItemFound)
      {
        itemNumberWithinBasket = sameItemFound.quantity;
      }
  };  

  const maxNumberItemsPerOrder = plMaxQuantityPerOrder[itemName]["QuantityLimitPerOrder"];



  try {
    //Only remove items which exist within basket
  
      //Only remove number of items when:
      if (
        0 < itemQuantity &&
        itemQuantity <= maxNumberItemsPerOrder &&
        itemQuantity <= itemNumberWithinBasket
      ) 
      {

        //Create a basket item
        const basketItem = {
          name: itemName,
          quantity: itemQuantity,
        };

        dispatch(basketSliceActions.removeFromBasket({"basket":basketItem}));

        //Decrement quantity if more than one of the time
        if (1 < itemNumberWithinBasket) 
        {
       
          const oldBasketItem = getLocalStorage("basket").find(
            (oldBasketItem) => oldBasketItem.name == basketItem.name
          );

          oldBasketItem["quantity"] -= 1;

          const decrementedBasket = getLocalStorage("basket").filter((oldBasketItem) => oldBasketItem.name != basketItem.name).concat([oldBasketItem]);
          
          setLocalStorage("basket",decrementedBasket);
          return;
        }
        //Remove from basket altogether if only one item
        else if (itemNumberWithinBasket == 1) 
        {
          const oldBasketItemsMinusThisItem = getLocalStorage("basket").filter(
            (currBasketItem) => currBasketItem.name !== basketItem.name
          );

          return setLocalStorage("basket", oldBasketItemsMinusThisItem);
        }
        else 
        {
          dispatch(errorMessageSliceActions.setBasketErrorMessage({basketErrorMessage:"This item is not currently within your basket..."}));
          throw new Error("This item is not currently within your basket...");
        }    
        } 
  }
  catch (e) 
  {
    console.log(e);
    dispatch(errorMessageSliceActions.setBasketErrorMessage({basketErrorMessage: e.message}));
  }
}
};

export default removeItemFromBasket;