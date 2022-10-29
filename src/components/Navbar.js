import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Button, Modal, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import { getProductData } from "../productsStore";
import CartProduct from "./CartProduct";
function NavbarComp() {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }
  const cart = useContext(CartContext);
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url); // Forwarding user to Stripe
        }
      });
  };

  return (
    <>
      {" "}
      <Navbar expand="sm">
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart {productsCount} Items</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <h1>Below are the items in your Cart</h1>
              {cart.items.map((cartProduct, index) => {
                return (
                  <CartProduct
                    key={index}
                    id={cartProduct.id}
                    quantity={cartProduct.quantity}
                  />
                );
              })}
              <h1>Total Cost : {cart.getTotalCost().toFixed(2)}</h1>
              <Button variant="success" onClick={checkout}>
                Purchase
              </Button>
            </>
          ) : (
            <h1>there is no data in your cart</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarComp;
