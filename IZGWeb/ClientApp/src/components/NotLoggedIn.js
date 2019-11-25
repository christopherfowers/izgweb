import React from "react";
import userManager from "../utils/userManager";

function NotLoggedIn(props) {
    return (
      <div>
          Please <a onClick={() => userManager.signinRedirect()}>Log In.</a>
      </div>  
    );
} 

export default NotLoggedIn;