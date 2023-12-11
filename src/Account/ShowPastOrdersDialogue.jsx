import DialogueTitle from "./DialogueWindowComponents/DialogueTitle";
import styles from "./ShowPastOrdersDialogue.module.css";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import convertDateToReadableFormat from "./DateFunctions/convertDateToReadableFormat";

function ShowPastOrdersDialogue(props) {
  // Format the date

  const pastOrders = useSelector((state) => state.pastOrders);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <DialogueTitle closeDialogue={props.closeDialogue}></DialogueTitle>
        <div className={styles.dialogueTitle}>See Past Orders</div>
        
        {/* No past orders  */}
        {pastOrders == undefined ||
          (pastOrders.length == 0 && <p>No orders have been made</p>)}
        
        {/* Past orders made */}
        {pastOrders && (
          <Fragment>
            <div className={styles.tableContainer}>
              {/* Table headings */}
              <table className={styles.table}>
                <thead>
                <tr>
                  <th>Order Date</th>
                  <th>Order Items</th>
                  <th>Total Price</th>
                  <th>Delivery Address</th>
                </tr>
                </thead>
                <tbody>
                {/* Table entries */}
                {pastOrders.map((order,index) => {
                  return (
                    <tr key={index}>
                      <td className={styles.orderPlDate}>
                        {convertDateToReadableFormat(order.orderPlacementDate)}
                      </td>
                      <td className={styles.orderedItems}>
                        {order.orderedItems.map((item,index) => {
                          return <li key={item + index}>{item.replaceAll("|", " ")}</li>;
                        })}
                      </td>
                      <td className={styles.totalPrice}>
                        {order.totalOrderPriceGBP}
                      </td>
                      <td className={styles.orderAddress}>
                        {order.addresseePostAddress}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              </table>
            </div>
            <p>For any order queries, please contact thepodisland@gmail.com.</p>
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default ShowPastOrdersDialogue;
