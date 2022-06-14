import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAllCategory } from "../../actions";

const Category = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getAllCategory());
   }, []);

   return (
      <Layout sidebar>
         <Container>
            <Row>
               <Col md={12}>
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "space-between",
                     }}
                  >
                     <h3>Category</h3>
                     <Button>Add</Button>
                  </div>
               </Col>
            </Row>
            <Row>
               <Col md={12}></Col>
            </Row>
         </Container>
      </Layout>
   );
};

export default Category;
