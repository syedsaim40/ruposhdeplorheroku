/* eslint-disable eqeqeq */
import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../../components/Layout/Metadata";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  // const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = 250;
  // subtotal > 1000 ? 0 : 200;

  //const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{shippingInfo.name}</span>
              </div>
              <div>
                <p>Email:</p>
                <span>{shippingInfo.email}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/oneproduct/${item.product}`}>
                      {item.name}<br></br>
                      {
                        item.color&&item.color!=""?(
                          <span>{`Color: ${item.color}`}</span>
                        ):(null)
                      }<br></br>
                      {
                        // eslint-disable-next-line eqeqeq
                        item.size&&item.size!=""?(
                          <span>{`Size: ${item.size}`}</span>

                        ):(null)
                      }
      
                    </Link>{" "}
                    <span>
                      {item.quantity} X PKR {item.price} ={" "}
                      <b>PKR {item.price * item.quantity}</b>
                    </span>
             
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>PKR {subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>PKR {shippingCharges}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>PKR {totalPrice}</span>
            </div>

            <button className="btn_primary active" onClick={proceedToPayment}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
