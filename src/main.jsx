import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";

window.store = store;

ReactDOM.createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <Router>
         <React.StrictMode>
            <App />
         </React.StrictMode>
      </Router>
   </Provider>
);
