import "./Loading.css";

import React from "react";

import Spinner from "../../Images/loading.png";

export default function(props) {
    return (
      <div style={{...props.style}}>
          <img style={{height: '100%'}} className={"loading-spinner"} src={Spinner} alt={"spinner"} />
      </div>  
    );
}