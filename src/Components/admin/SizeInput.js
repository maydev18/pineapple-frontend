import { Form, Row, Col } from 'react-bootstrap';

const SizeQuantityInput = ({ sizes, values , onQuantityChange }) => {
  const handleChange = (size, value) => {
   
    onQuantityChange(size, value);
  };
  return (
    <Form>
      <Row>
        {sizes.map((size , index) => (
          <Col key={size} xs={6} md={2}>
            <Form.Group controlId={`quantity-${size}`}>
              <Form.Label>{size}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Quantity"
                onChange={(e) => handleChange(size, e.target.value)}
                value={values[index]}
              />
            </Form.Group>
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export default SizeQuantityInput;
