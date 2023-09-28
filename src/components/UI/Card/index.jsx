import React from "react";
import "./style.css";

function Card({ headerLeft, headerRight, ...props }) {
   return (
      <div className="card" {...props}>
         {
            <div className="card-header">
               {headerLeft && <div>{headerLeft}</div>}
               {headerRight && headerRight}
            </div>
         }

         {props.children}
      </div>
   );
}

export default Card;
