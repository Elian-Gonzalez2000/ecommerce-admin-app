import React from "react";
import Layout from "../../components/Layout";
import { Row, Col, Container } from "react-bootstrap";
import "./style.css";

const Home = (props) => {
   return (
      <Layout>
         <Container>
            <Row>
               <Col md={2} className="sidebar">
                  Sidebar
               </Col>
               <Col md={10} style={{ marginLeft: "auto" }}>
                  Container
               </Col>
            </Row>
         </Container>
         {/* <h1>Welcome Home</h1> */}
      </Layout>
   );
};

export default Home;
