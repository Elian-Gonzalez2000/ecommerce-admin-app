import React from "react";
import { Form } from "react-bootstrap";

/* 
   This component create an input with all the data that need it.
   Use the bootstrap components for styles
*/
const Input = ({ label, type, placeholder, value, onChange, errorMessage }) => {
   return (
      <Form.Group className="mb-3" controlId="formBasicEmail">
         {label && <Form.Label>{label}</Form.Label>}
         <Form.Control
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
         />
         <Form.Text className="text-muted">{errorMessage}</Form.Text>
      </Form.Group>
   );
};

export default Input;
