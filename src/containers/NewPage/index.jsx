import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import linearCategories from "../../helpers/linearCategories";

function NewPage() {
   const [createModal, setCreateModal] = useState(false);
   const [title, setTitle] = useState("");
   const category = useSelector((state) => state.category);
   const [categories, setCategories] = useState([]);
   const [categoryId, setCategoryId] = useState("");
   const [description, setDescription] = useState("");
   const [banners, setBanners] = useState([]);
   const [products, setProducts] = useState([]);

   useEffect(() => {
      setCategories(linearCategories(category.categories));
   }, []);

   const handleBannersImage = (e) => {
      console.log(e);
   };

   const handleProductsImage = (e) => {
      console.log(e);
   };

   const renderCreatePageModal = () => {
      return (
         <Modal
            show={createModal}
            modalTitle={"Create New Page"}
            handleClose={() => setCreateModal(false)}
         >
            <Container>
               <Row>
                  <Col>
                     <select
                        className="form-control form-control-sm mb-3"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                     >
                        <option value="">Select category</option>
                        {categories.map((cat) => {
                           return (
                              <option key={cat._id} value={cat._id}>
                                 {cat.name}
                              </option>
                           );
                        })}
                     </select>
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Page Title"
                        className="form-control form-control-sm"
                     />
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={"Page Description"}
                        className="form-control form-control-sm"
                     />
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <input
                        type="file"
                        name="banners"
                        onChange={handleBannersImage}
                        className="form-control form-control-sm"
                     />
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <input
                        type="file"
                        name="products"
                        onChange={handleProductsImage}
                        className="form-control form-control-sm"
                     />
                  </Col>
               </Row>
            </Container>
         </Modal>
      );
   };

   return (
      <Layout sidebar>
         {renderCreatePageModal()}
         <button onClick={() => setCreateModal(true)}>Create page</button>
      </Layout>
   );
}

export default NewPage;
