import React from "react";
import { Form } from "react-bootstrap";

/* 
   This component create an input with all the data that need it.
   Use the bootstrap components for styles
*/
const Input = (props) => {
   const { label, type, placeholder, value, onChange, errorMessage } = props;

   let input = null;
   switch (type) {
      case "select":
         input = (
            <Form.Group className="mb-3" controlId="formBasicEmail">
               {label && <Form.Label>{label}</Form.Label>}
               <select
                  className="form-control form-control-sm"
                  value={value}
                  onChange={onChange}
               >
                  <option value="">{placeholder}</option>
                  {props.options.length > 0
                     ? props.options.map((option, index) => (
                          <option
                             key={`${option.name}-${index}`}
                             value={option._id}
                          >
                             {option.name}
                          </option>
                       ))
                     : null}
               </select>
            </Form.Group>
         );
         break;
      case "text":
      default:
         input = (
            <Form.Group className="mb-3" controlId="formBasicEmail">
               {label && <Form.Label>{label}</Form.Label>}
               <Form.Control
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                  className={props.className}
               />
               <Form.Text className="text-muted">{errorMessage}</Form.Text>
            </Form.Group>
         );
         break;
   }
   return input;
};

export default Input;
