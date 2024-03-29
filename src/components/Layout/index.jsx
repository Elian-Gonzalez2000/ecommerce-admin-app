import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../Header";
import "./style.css";

const Layout = (props) => {
   return (
      <>
         <Header />
         {props.sidebar ? (
            <Container>
               <Row>
                  <Col md={2} className="sidebar">
                     <ul>
                        <li>
                           {" "}
                           <NavLink to={"/"}>Home</NavLink>{" "}
                        </li>
                        <li>
                           {" "}
                           <NavLink to={"/page"}>Page</NavLink>{" "}
                        </li>
                        <li>
                           {" "}
                           <NavLink to={"/products"}>Products</NavLink>{" "}
                        </li>
                        <li>
                           {" "}
                           <NavLink to={"/orders"}>Orders</NavLink>{" "}
                        </li>
                        <li>
                           {" "}
                           <NavLink to={"/categories"}>Categories</NavLink>{" "}
                        </li>
                     </ul>
                  </Col>
                  <Col
                     md={10}
                     style={{ marginLeft: "auto", paddingTop: "60px" }}
                  >
                     {props.children}
                  </Col>
               </Row>
            </Container>
         ) : (
            props.children
         )}
      </>
   );
};

export default Layout;
