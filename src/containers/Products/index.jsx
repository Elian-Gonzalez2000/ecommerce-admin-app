import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import { addProduct, deleteProductById } from "../../actions";
import Modal from "../../components/UI/Modal";
import { genericPublicUrl } from "../../urlConfig";
import { randomUI } from "../../helpers/randomUI";
import { uploadImage } from "../../firebase/firebase.client";
import "./styles.css";

const Products = () => {
   const [name, setName] = useState("");
   const [quantity, setQuantity] = useState("");
   const [price, setPrice] = useState("");
   const [description, setDescription] = useState("");
   const [categoryId, setCategoryId] = useState("");
   const [productPictures, setProductPictures] = useState([]);
   const [productDetail, setProductDetail] = useState(null);
   const [productDetailModal, setProductDetailModal] = useState(false);
   const [imgURL, setImgUrl] = useState([]);
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
      const data = {
         name,
         quantity,
         price,
         description,
         category: categoryId,
         images: imgURL,
      };
      dispatch(addProduct(form, data));
      setShow(false);
   };

   const handleShow = () => setShow(true);

   const handleProductPictures = (e) => {
      uploadImage(e.target.files[0]).then((res) => setImgUrl([...imgURL, res]));
      console.log(imgURL);
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
                  <th>Category</th>
               </tr>
            </thead>
            <tbody>
               {product.products.length > 0
                  ? product.products.map((prod, index) => {
                       return (
                          <tr
                             key={prod._id}
                             onClick={() => showProductDetailsModal(prod)}
                          >
                             <td>{index + 1}</td>
                             <td>{prod.name}</td>
                             <td>{prod.price}</td>
                             <td>{prod.quantity}</td>
                             <td>{prod.category.name}</td>
                             <td>
                                <button
                                   onClick={(e) => {
                                      showProductDetailsModal(product);
                                   }}
                                >
                                   info
                                </button>
                                <button
                                   onClick={(e) => {
                                      e.stopPropagation();
                                      const payload = {
                                         productId: prod._id,
                                      };
                                      dispatch(deleteProductById(payload));
                                   }}
                                >
                                   del
                                </button>
                             </td>
                          </tr>
                       );
                    })
                  : null}
            </tbody>
         </Table>
      );
   };

   const renderAddProductModal = () => {
      return (
         <Modal
            show={show}
            onSubmit={handleClose}
            handleClose={() => setShow(false)}
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
                    <div key={randomUI()}>{pic.name}</div>
                 ))
               : null}
            <input
               type="file"
               name="productPicture"
               onChange={handleProductPictures}
            />
         </Modal>
      );
   };

   const handleCloseProductDetailModal = () => {
      setProductDetailModal(false);
   };

   const showProductDetailsModal = (prod) => {
      setProductDetail(prod);
      setProductDetailModal(true);
   };

   const renderShowProductDetailsModal = () => {
      if (!productDetail) {
         return null;
      }
      return (
         <Modal
            show={productDetailModal}
            handleClose={handleCloseProductDetailModal}
            modalTitle={"Product Details"}
            size="lg"
         >
            <Row>
               <Col md="6">
                  <strong>Name</strong>
                  <p>{productDetail.name}</p>
               </Col>
               <Col md="6">
                  <strong>Price</strong>
                  <p>{productDetail.price}</p>
               </Col>
            </Row>
            <Row>
               <Col md="6">
                  <strong>Quantity</strong>
                  <p>{productDetail.quantity}</p>
               </Col>
               <Col md="6">
                  <strong>Category</strong>
                  <p>{productDetail.category.name}</p>
               </Col>
            </Row>
            <Row>
               <Col md="12">
                  <strong>Description</strong>
                  <p>{productDetail.decription}</p>
               </Col>
            </Row>
            <Row>
               <Col className="pictures-container">
                  {productDetail?.productPictures.map((picture) => {
                     return (
                        <div key={randomUI()}>
                           <img
                              src={`${picture.imgUrl}`}
                              alt={`Image URL: ${picture.imgUrl}`}
                           />
                        </div>
                     );
                  })}
               </Col>
            </Row>
         </Modal>
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
         {renderAddProductModal()}
         {renderShowProductDetailsModal()}
      </Layout>
   );
};

export default Products;
