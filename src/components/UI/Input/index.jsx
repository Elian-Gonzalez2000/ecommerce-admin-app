import React from "react";
import { Form } from "react-bootstrap";

const Input = ({ label, type, placeholder, value, onChange, errorMessage }) => {
   return (
      <Form.Group className="mb-3" controlId="formBasicEmail">
         <Form.Label>{label}</Form.Label>
         <Form.Control type={type} placeholder={placeholder} value={value} />
         <Form.Text className="text-muted">{errorMessage}</Form.Text>
      </Form.Group>
   );
};

export default Input;
