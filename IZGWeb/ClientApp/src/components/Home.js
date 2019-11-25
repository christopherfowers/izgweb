import React, { Component } from "react";
import {connect} from "react-redux";

let HomeComponent = () => {
    return(
        <div style={{width: '100vw'}}>
            IZG Private Gaming Community. Application is under development so expect bugs and missing / broken features.
        </div>
    )
};

const mapStateToProps = state => {
    return {
        user: state.oidc.user
    }
};

export default connect(mapStateToProps)(HomeComponent);


