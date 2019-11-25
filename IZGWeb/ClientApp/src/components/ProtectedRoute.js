import React from "react";
import {connect} from "react-redux";
import jwtDecode from "jwt-decode"
import {Redirect, Route, withRouter} from "react-router-dom";

let ProtectedRoute = withRouter(function({ component: Component, path, oidc, acceptedPermissions, failurePath, ...rest }) {
    const ap = acceptedPermissions || [];
    const isAuthenticated = !!oidc.user && !oidc.user.expired;
    let hasPermission = !ap.length;
    try {
        if (isAuthenticated && !hasPermission) {
            let userPermissions = jwtDecode(oidc.user.access_token).permissions;
            if (userPermissions.length && ap.length) {
                hasPermission = !!userPermissions.some(r => ap.indexOf(r) >= 0);
            }
        }
    } catch(ex) {
        console.error(ex);
    }

    const toRender = (props) => {
        return isAuthenticated && hasPermission 
            ? <Component {...props} /> 
            : !!failurePath 
                ? <Redirect to={failurePath} />
                : null
    };

    return (<Route path={path} render={toRender} {...rest} />)
});

const mapStateToProps = state => {
    return {
        oidc: state.oidc
    }
};

export default connect(mapStateToProps)(ProtectedRoute);