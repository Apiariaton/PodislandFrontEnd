import { basketSliceActions } from "./basketSlice";
import {errorMessageSliceActions} from "../errorMessage/errorMessageSlice";
import { productNames, plMaxQuantityPerOrder } from "./productList";
import { useSelector } from "react-redux";
import getLocalStorage from "../../localStorageFunctions/getLocalStorage";
import setLocalStorage from "../../localStorageFunctions/setLocalStorage";

// const newItemObject = {
//   ProductName: "Podisland Mug",
//   ProductQuantity: 1,
// };

export default function addItemToBasket(newItemObject) 
{
  
  return (dispatch,getState) => {
  
  dispatch(errorMessageSliceActions.clearBasketErrorMessage());

  const itemName = newItemObject["ProductName"];
  const itemQuantity = newItemObject["ProductQuantity"];
  const currentState = getState();
  // console.log("currentState",currentState);
  
  let itemNumberWithinBasket = 0;
  
  //Check that basket is not empty
  if (currentState.basket.basket.filter((basketItem)=>basketItem != undefined).length >= 1)
  {
      //Check whether same item already exists within basket: if so, how many
      const sameItemFound = currentState.basket.basket.find((basketItem)=>basketItem["name"] == itemName);
      if (sameItemFound != undefined)
      {
        itemNumberWithinBasket = sameItemFound.quantity;
      }
  }  
  //console.log(itemNumberWithinBasket);
  
  const maxNumberItemsPerOrder = plMaxQuantityPerOrder[itemName]["QuantityLimitPerOrder"];

  try {
    if (productNames.includes(itemName)) {
      
      //Accept orders where item quantity is below item quantity order max
      // console.log(`productNames includes ${itemName}`);

      if (
        0 < itemQuantity &&
        itemQuantity < maxNumberItemsPerOrder &&
        itemNumberWithinBasket + itemQuantity <= maxNumberItemsPerOrder
      ) {

        

        //Create a basket item
        const newBasketItem = {
          name: itemName,
          quantity: itemQuantity,
        };
        // console.log("NBI",newBasketItem);

        dispatch(basketSliceActions.addToBasket({"basket": newBasketItem}));

        let currentBasket = getLocalStorage("basket");
        // console.log("currentBasket",currentBasket);

        // If basket empty, create basket with this item
        if (currentBasket == null || currentBasket.length == 0) {
          console.log("This condition was true...");
          console.log(newBasketItem);
          setLocalStorage("basket", [newBasketItem]);
          return;
        }
        else
        {
        //Check whether item already exists within basket
        const sameItemWithinBasket = currentBasket.find(
          (oldBasketItem) => oldBasketItem.name === newBasketItem.name
        );
        const numberSameItemsWithinBasket = sameItemWithinBasket
          ? sameItemWithinBasket["quantity"]
          : 0;

        //Increment quantity of item when item in basket
        if (0 < numberSameItemsWithinBasket) {
          sameItemWithinBasket["quantity"] += newBasketItem["quantity"];
          setLocalStorage("basket", currentBasket);
          return;
        }
        //Add item if it does not in basket
        else {
          let basketPlusNewItem = getLocalStorage("basket").concat([
            newBasketItem,
          ]);
          setLocalStorage("basket", basketPlusNewItem);
          return;
        }
        }
      }
      dispatch(errorMessageSliceActions.setBasketErrorMessage({basketErrorMessage:"The quantity of products ordered falls outside the acceptable limit of 0 to 5"}));
      throw new Error(
        "The quantity of products ordered falls outside the acceptable limit of 0 to 5"
      );
    }
    dispatch(errorMessageSliceActions.setBasketErrorMessage({basketErrorMessage:"The product requested does not exist within our product range..."}));
    throw new Error(
      "The product requested does not exist within our product range..."
    );
  } 
  catch (e) 
  {
    console.log(e);
    dispatch(errorMessageSliceActions.setBasketErrorMessage(e.message));
  }
}
};
