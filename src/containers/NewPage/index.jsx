import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import linearCategories from "../../helpers/linearCategories";
import { createPage } from "../../actions";

function NewPage() {
   const [createModal, setCreateModal] = useState(false);
   const [title, setTitle] = useState("");
   const category = useSelector((state) => state.category);
   const [categories, setCategories] = useState([]);
   const [categoryId, setCategoryId] = useState("");
   const [description, setDescription] = useState("");
   const [type, setType] = useState("");
   const [banners, setBanners] = useState([]);
   const [products, setProducts] = useState([]);
   const dispatch = useDispatch();
   const page = useSelector((state) => state.page);

   useEffect(() => {
      setCategories(linearCategories(category.categories));
   }, [category]);

   useEffect(() => {
      //console.log(page);
      if (!page.loading) {
         setCreateModal(false);
         setTitle("");
         setType("");
         setDescription("");
         setProducts([]);
         setBanners([]);
      }
   }, [page]);

   const onCategoryChange = (e) => {
      const category = categories.find(
         (category) => category._id == e.target.value
      );
      console.log(category, e.target, categories);
      setCategoryId(e.target.value);
      setType(category.type);
   };

   const handleBannersImage = (e) => {
      console.log(e);
      setBanners([...banners, e.target.files[0]]);
   };

   const handleProductsImage = (e) => {
      console.log(e);
      setProducts([...products, e.target.files[0]]);
   };

   const submitPageForm = (e) => {
      //e.target.preventDefault();

      if (title === "") {
         alert("Title is required");
         return;
      }

      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("category", categoryId);
      form.append("type", type);
      banners.forEach((banner, index) => {
         form.append("banners", banner);
      });
      products.forEach((product, index) => {
         form.append("products", product);
      });

      dispatch(createPage(form));
      setCreateModal(false);
   };

   const renderCreatePageModal = () => {
      return (
         <Modal
            show={createModal}
            modalTitle={"Create New Page"}
            handleClose={() => setCreateModal(false)}
            onSubmit={submitPageForm}
         >
            <Container>
               <Row>
                  <Col>
                     {/* <select
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
                     </select> */}
                     <Input
                        type="select"
                        value={categoryId}
                        onChange={onCategoryChange}
                        options={categories}
                        placeholder={"Select Categories"}
                     />
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <Input
                        type="text"
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
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={"Page Description"}
                        className="form-control form-control-sm"
                     />
                  </Col>
               </Row>
               <Row>
                  {banners.length > 0
                     ? banners.map((banner, index) => (
                          <Row key={`${index}-${banner.name}`}>
                             <Col>{banner.name}</Col>
                          </Row>
                       ))
                     : null}
                  <Col>
                     <label htmlFor="banners">Banner Image</label>
                     <input
                        type="file"
                        name="banners"
                        onChange={handleBannersImage}
                        className="form-control form-control-sm"
                     />
                  </Col>
               </Row>
               <Row>
                  {products.length > 0
                     ? products.map((product, index) => (
                          <Row key={`${index}-${product.name}`}>
                             <Col>{product.name}</Col>
                          </Row>
                       ))
                     : null}
                  <Col>
                     <label htmlFor="products">Products Images</label>
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
         {page.loading ? (
            <>
               <h3>Creating Page...</h3>
            </>
         ) : (
            <>
               {renderCreatePageModal()}
               <button onClick={() => setCreateModal(true)}>Create page</button>
            </>
         )}
      </Layout>
   );
}

export default NewPage;
