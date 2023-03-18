import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { isUserLoggedIn, getInitialData } from "./actions";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";
import NewPage from "./containers/NewPage";

function App() {
   const url = "http://localhost:3002/api/admin/signin";
   const data = {
      /*       firstName: "Edwiin",
      lastName: "Gonzalez", */
      /* email: "eliancarlogm@gmail.com",
      password: "123456789", */
      //name: "Electronics",
      //parentId: "627b1a44874b7eba250c33d8",
   };
   /*  fetch(url, {
      method: "POST",
      body: JSON.stringify({
         email: "eswin@gmail.com",
         password: "123456789",
      }),
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then((res) => res.json())
      .then((data) => {
         console.log(data);
         if (data?.token) {
            console.log(data.token);
            fetch("http://localhost:3002/api/category/create", {
               method: "POST",
               body: JSON.stringify({ name: "Sports" }),
               headers: {
                  "Content-Type": "application/json",
                  authorization:
                     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdiMWE0NDg3NGI3ZWJhMjUwYzMzZDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTIyMzUxNzQsImV4cCI6MTY1MjI0MjM3NH0.EfNoWqYCmu210ryhnQcXSAau3e3lUwLMDBqiq9ZUp9o",
               },
            })
               .then((res) => res.json())
               .then((data) => console.log(data))
               .catch((err) => console.log(err));
         }
      })
      .catch((error) => console.log(error));
 */
   const dispatch = useDispatch();
   const auth = useSelector((state) => state.auth);

   useEffect(() => {
      if (!auth.authenticate) {
         dispatch(isUserLoggedIn());
      }
   }, []);
   useEffect(() => {
      if (!auth.authenticate) {
         dispatch(isUserLoggedIn());
      }
      if (auth.authenticate) {
         dispatch(getInitialData());
      }
   }, [auth.authenticate]);
   return (
      <div className="App">
         <Routes>
            <Route path="/" exact element={<PrivateRoute component={Home} />} />
            <Route
               path="/page"
               element={<PrivateRoute component={NewPage} />}
            />
            <Route
               path="/products"
               element={<PrivateRoute component={Products} />}
            />
            <Route
               path="/orders"
               element={<PrivateRoute component={Orders} />}
            />
            <Route
               path="/categories"
               element={<PrivateRoute component={Category} />}
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
         </Routes>
      </div>
   );
}

export default App;
