import React, { useMemo } from "react";
import Header from "../../components/Header";
import "../../tracking.css";
import { useLocation, useNavigate } from "react-router";
import dayjs from "dayjs";
import {
  FaShoppingCart,
  FaCog,
  FaMedal,
  FaTruck,
  FaHome,
} from "react-icons/fa";

// Step definitions
const steps = [
  { label: "Confirmed Order", icon: <FaShoppingCart /> },
  { label: "Processing Order", icon: <FaCog /> },
  { label: "Quality Check", icon: <FaMedal /> },
  { label: "Product Dispatched", icon: <FaTruck /> },
  { label: "Product Delivered", icon: <FaHome /> },
];

// Status text mapped by index
const statusList = [
  "Confirmed",
  "Processing",
  "Quality Check",
  "Dispatched",
  "Delivered",
];

const Tracking = ({ cart, loadcart }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // 🔐 Redirect if opened directly
  if (!state) {
    navigate("/orders");
    return null;
  }

  const { orderId, deliveryDate, product } = state;

  // 🎲 Random step (stable per render)
  const currentStep = useMemo(
    () => Math.floor(Math.random() * steps.length),
    []
  );

  const status = statusList[currentStep];

  return (
    <div>
      <Header cart={cart} loadcart={loadcart} />

      <div className="tracking-container mt-5">
        {/* Header */}
        <div className="tracking-header">
          <h3>TRACKING ORDER NO - {orderId}</h3>
        </div>

        {/* Order Info */}
        <div className="tracking-info">
          <span>
            <b>Shipped Via:</b> UPS Ground
          </span>
          <span>
            <b>Status:</b> {status}
          </span>
          <span>
            <b>Expected Date:</b>{" "}
            {dayjs(deliveryDate).format("MMMM D, YYYY")}
          </span>
        </div>

        {/* Product Info */}
        <div className="tracking-product">
          <img
            src={product.image}
            alt={product.name}
            className="tracking-product-image"
          />

          <div className="tracking-product-details">
            <h4>{product.name}</h4>
            <p>Quantity: {product.quantity}</p>
            <p>
              Arriving on:{" "}
              {dayjs(deliveryDate).format("dddd, MMMM D")}
            </p>
          </div>
        </div>

        {/* Tracking Steps */}
        <div className="tracking-steps ms-3">
          {steps.map((step, index) => (
            <div className="step-wrapper" key={index}>
              <div
                className={`step-circle ${
                  index <= currentStep ? "active" : ""
                }`}
              >
                {step.icon}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`step-line ${
                    index < currentStep ? "active" : ""
                  }`}
                />
              )}

              <p className="step-label">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tracking;









