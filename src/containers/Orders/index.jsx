import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { randomUI } from "../../helpers/randomUI";
import "./style.css";

const Orders = (props) => {
   const order = useSelector((state) => state.order);
   const [type, setType] = useState("");
   const dispatch = useDispatch();

   const onOrderUpdate = (orderId) => {
      const payload = {
         orderId,
         type,
      };
      dispatch(updateOrder(payload));
   };
   console.log(order);

   const formatDate = (date) => {
      if (date) {
         const d = new Date(date);
         return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      }
      return "";
   };

   return (
      <Layout sidebar>
         {order &&
            order.orders.map((orderItem) => (
               <Card
                  key={randomUI()}
                  headerLeft={orderItem._id}
                  style={{ margin: "2rem auto" }}
               >
                  <div
                     style={{
                        padding: "2rem 1rem",
                     }}
                  >
                     <div
                        style={{
                           display: "flex",
                           justifyContent: "space-between",
                           paddingBottom: "50px",
                        }}
                     >
                        <div>
                           <div className="title">Items</div>
                           {orderItem.items.map((item) => (
                              <div key={randomUI()} className="value">
                                 {item.productId.name}
                              </div>
                           ))}
                        </div>
                        <div>
                           <span className="title">Total Price</span>
                           <br />
                           <span className="value">
                              {orderItem.totalAmount}
                           </span>
                        </div>
                        <div>
                           <span className="title">Payment Type</span> <br />
                           <span className="value">
                              {orderItem.paymentType}
                           </span>
                        </div>
                        <div>
                           <span className="title">Payment Status</span> <br />
                           <span className="value">
                              {orderItem.paymentStatus}
                           </span>
                        </div>
                     </div>
                     <div
                        style={{
                           display: "flex",
                           justifyContent: "space-evenly",
                        }}
                     >
                        <div className="orderTrack">
                           {orderItem.orderStatus.map((status) => (
                              <div
                                 key={randomUI()}
                                 className={`orderStatus ${
                                    status.isCompleted ? "active" : ""
                                 }`}
                              >
                                 <div
                                    className={`point ${
                                       status.isCompleted ? "active" : ""
                                    }`}
                                 ></div>
                                 <div className="orderInfo">
                                    <div className="status">{status.type}</div>
                                    <div className="date">
                                       {formatDate(status.date)}
                                    </div>
                                 </div>
                              </div>
                           ))}

                           {/* <div className="orderStatus">
                           <div className="point"></div>
                           <div className="orderInfo">
                              <div className="status">Packed</div>
                              <div className="date">Fri, 2020</div>
                           </div>
                        </div>
                        <div className="orderStatus">
                           <div className="point"></div>
                           <div className="orderInfo">
                              <div className="status">Shipped</div>
                              <div className="date">Fri, 2020</div>
                           </div>
                        </div>
                        <div className="orderStatus">
                           <div className="point"></div>
                           <div className="orderInfo">
                              <div className="status">Delivered</div>
                              <div className="date">Fri, 2020</div>
                           </div>
                        </div> */}
                        </div>

                        {/* select input to apply order action */}
                        <div className="order-track-button">
                           <select onChange={(e) => setType(e.target.value)}>
                              <option value={""}>select status</option>
                              {orderItem.orderStatus.map((status) => {
                                 return (
                                    <>
                                       {!status.isCompleted ? (
                                          <option
                                             key={status.type}
                                             value={status.type}
                                          >
                                             {status.type}
                                          </option>
                                       ) : null}
                                    </>
                                 );
                              })}
                           </select>
                        </div>
                        {/* button to confirm action */}

                        <div className="order-track-button">
                           <button onClick={() => onOrderUpdate(orderItem._id)}>
                              confirm
                           </button>
                        </div>
                     </div>
                  </div>
               </Card>
            ))}
      </Layout>
   );
};

export default Orders;
