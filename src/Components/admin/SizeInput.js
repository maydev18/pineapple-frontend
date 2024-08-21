import { Form, Row, Col } from 'react-bootstrap';

const SizeQuantityInput = ({ sizes, values , onQuantityChange }) => {
  const handleChange = (size, value) => {
    // Call the parent component's callback function
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
                type="number"
                min="0"
                placeholder="0"
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
