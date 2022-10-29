import React from "react";
import { useContext } from "react";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import { CartContext } from "../CartContext";

function ProductCard({ product = {} }) {
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{product?.title}</Card.Title>
        <Card.Text>{product?.price}</Card.Text>
        {productQuantity > 0 && (
          <>
            <Form as={Row}>
              <Form.Label column={true} sm="6">
                In cart: {productQuantity}
              </Form.Label>
              <Col>
                <Button
                  variant="primary"
                  onClick={() => cart.addOneToCart(product.id)}
                >
                  +
                </Button>
                <Button
                  variant="primary"
                  onClick={() => cart.removeOneFromCart(product.id)}
                >
                  -
                </Button>
              </Col>
            </Form>
            <Button
              variant="danger"
              onClick={() => cart.deleteFromCart(product.id)}
            >
              Remove from the cart
            </Button>
          </>
        )}
        {productQuantity === 0 && (
          <Button
            variant="primary"
            onClick={() => cart.addOneToCart(product.id)}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
