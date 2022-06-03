import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { login } from "../../actions";

const Signin = (props) => {
   const userLogin = () => {
      e.preventDefault();
      const user = {
         email: "riz@webscript.info",
         password: "123456",
      };

      login(user);
   };

   return (
      <Layout>
         <Container>
            <Row style={{ marginTop: "3.5rem" }}>
               <Col md={{ span: 6, offset: 3 }}>
                  <Form onSubmit={userLogin}>
                     <Input
                        label="Email Address"
                        placeholder="Email Address..."
                        value=""
                        type="email"
                        onChange={() => {}}
                     />

                     <Input
                        label="Password"
                        placeholder="Password..."
                        value=""
                        type="password"
                        onChange={() => {}}
                     />
                     <Button variant="primary" type="submit">
                        Submit
                     </Button>
                  </Form>
               </Col>
            </Row>
         </Container>
      </Layout>
   );
};

export default Signin;
