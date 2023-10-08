import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../actions";

const Signup = (props) => {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");
   const [error, setError] = useState("");
   const auth = useSelector((state) => state.auth);
   const user = useSelector((state) => state.user);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!user.loading) {
         setFirstName("");
         setLastName("");
         setEmail("");
         setPassword("");
      }
   }, [user.loading]);

   const userSignup = (e) => {
      e.preventDefault();
      const user = {
         firstName,
         lastName,
         email,
         password,
      };

      dispatch(signup(user));
   };

   if (auth.authenticate) {
      return <Navigate to={"/"} replace={true} />;
   }

   if (user.loading) {
      return <p>Loading...</p>;
   }

   return (
      <Layout>
         {user.loading && <p>Loading...</p>}
         {user.message}
         <Row style={{ marginTop: "3.5rem" }}>
            <Col md={{ span: 6, offset: 3 }}>
               <Form onSubmit={userSignup}>
                  <Row>
                     <Col md={6}>
                        <Input
                           label="First Name"
                           placeholder="First Name..."
                           value={firstName}
                           type="text"
                           onChange={(e) => setFirstName(e.target.value)}
                        />
                     </Col>
                     <Col md={6}>
                        <Input
                           label="Last Name"
                           placeholder="Last Name..."
                           value={lastName}
                           type="text"
                           onChange={(e) => setLastName(e.target.value)}
                        />
                     </Col>
                  </Row>
                  <Input
                     label="Email Address"
                     placeholder="Email Address..."
                     value={email}
                     type="email"
                     onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                     label="Password"
                     placeholder="Password..."
                     value={password}
                     type="password"
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button variant="primary" type="submit">
                     Submit
                  </Button>
               </Form>
            </Col>
         </Row>
      </Layout>
   );
};

export default Signup;
