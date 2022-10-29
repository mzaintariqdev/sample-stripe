import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { productsArray } from "../productsStore";

function Store() {
  return (
    <>
      <h1 align="center" className="p-3">
        Welcome to store
      </h1>
      <Row xs={1} md={3} className="g-4">
        {productsArray.map((product, index) => {
          return (
            <Col key={index} align="center">
              <ProductCard product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default Store;
