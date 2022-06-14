import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions";

const Category = () => {
   const categories = useSelector((state) => state.categories);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getAllCategory());
   }, []);

   const renderCategories = (categoryList) => {
      let myCategories = [];
      for (let category of categoryList) {
         myCategories.push(
            <li key={category.name}>
               {category.name}
               {category.children.length > 0 ? (
                  <ul>{renderCategories(category.children)}</ul>
               ) : null}
            </li>
         );
      }
      return categories;
   };

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
               <Col md={12}>{renderCategories(categories)}</Col>
            </Row>
         </Container>
      </Layout>
   );
};

export default Category;
