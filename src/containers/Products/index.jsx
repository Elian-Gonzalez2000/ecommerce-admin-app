import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
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
   const product = useSelector((state) => state.product);
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

   const renderProducts = () => {
      return (
         <Table responsive="sm">
            <thead>
               <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Category</th>
               </tr>
            </thead>
            <tbody>
               {product.products.length > 0
                  ? product.products.map((prod, index) => {
                       return (
                          <tr key={prod._id}>
                             <td>{index + 1}</td>
                             <td>{prod.name}</td>
                             <td>{prod.price}</td>
                             <td>{prod.quantity}</td>
                             <td>{prod.description}</td>
                             <td>--</td>
                          </tr>
                       );
                    })
                  : null}
            </tbody>
         </Table>
      );
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
         <Row>
            <Col>{renderProducts()}</Col>
         </Row>
         <Modal
            show={show}
            onHide={handleClose}
            onClose={handleClose}
            modalTitle={"Add new product"}
         >
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
         </Modal>
      </Layout>
   );
};

export default Products;
