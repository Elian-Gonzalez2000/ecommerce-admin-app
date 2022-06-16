import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import { addProduct } from "../../actions/product.action";

const Products = () => {
   const [name, setName] = useState("");
   const [quantity, setQuantity] = useState("");
   const [price, setPrice] = useState("");
   const [description, setDescription] = useState("");
   const [categoryId, setCategoryId] = useState("");
   const [productPictures, setProductPictures] = useState([]);
   const category = useSelector((state) => state.category);
   const [show, setShow] = useState(false);
   const dispatch = useDispatch();

   const handleClose = () => {
      const form = new FormData();
      form.append("name", name);
      form.append("quantity", quantity);
      form.append("price", price);
      form.append("description", description);
      form.append("category", categoryId);
      for (let pic of productPictures) {
         form.append("productPicture", pic);
      }
      dispatch(addProduct(form));
      setShow(false);
   };

   const handleShow = () => setShow(true);

   const handleProductPictures = (e) => {
      setProductPictures([...productPictures, e.target.files[0]]);
   };

   const createCategoryList = (categories, options = []) => {
      for (let category of categories) {
         options.push({ value: category._id, name: category.name });
         if (category.children.length > 0) {
            createCategoryList(category.children, options);
         }
      }
      return options;
   };

   return (
      <Layout sidebar>
         <Row>
            <Col md={12}>
               <div
                  style={{
                     display: "flex",
                     justifyContent: "space-between",
                  }}
               >
                  <h3>Product</h3>
                  <Button onClick={handleShow}>Add</Button>
               </div>
            </Col>
         </Row>
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Add category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Input
                  label="Name"
                  value={name}
                  placeholder={"Product Name"}
                  onChange={(e) => setName(e.target.value)}
               />
               <Input
                  label="Quantity"
                  value={quantity}
                  placeholder={"Quantity"}
                  onChange={(e) => setQuantity(e.target.value)}
               />
               <Input
                  label="Price"
                  value={price}
                  placeholder={"Price"}
                  onChange={(e) => setPrice(e.target.value)}
               />
               <Input
                  label="Description"
                  value={description}
                  placeholder={"Description"}
                  onChange={(e) => setDescription(e.target.value)}
               />
               <select
                  className="form-control"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
               >
                  <option>Select Category</option>
                  {createCategoryList(category.categories).map((option) => (
                     <option key={option.value} value={option.value}>
                        {option.name}
                     </option>
                  ))}
               </select>
               {productPictures.length > 0
                  ? productPictures.map((pic, index) => (
                       <div key={index}>{pic.name}</div>
                    ))
                  : null}
               <input
                  type="file"
                  name="productPicture"
                  onChange={handleProductPictures}
               />
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={handleClose}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </Layout>
   );
};

export default Products;
