import React from "react"
import jwtDecode from "jwt-decode";
import {connect} from "react-redux";
import {Link} from "react-router-dom";


function ProtectedLink({ to, oidc, acceptedPermissions, children, className, ...rest }) {
    const isAuthenticated = !!oidc.user && !oidc.user.expired;
    let hasPermission = acceptedPermissions && acceptedPermissions.length;

    if (isAuthenticated) {
        let userPermissions = jwtDecode(oidc.user.access_token).permissions;
        if (userPermissions.length && acceptedPermissions && acceptedPermissions.length) {
            hasPermission = !!userPermissions.some(r => acceptedPermissions.indexOf(r) >= 0);
        }
    }
    
    return ( 
        <React.Fragment>
        {
            isAuthenticated && hasPermission ?
                <Link className={className} to={to}>{ children }</Link> : 
                null
        }
        </React.Fragment>
    );
}
const mapStateToProps = state => {
    return {
        oidc: state.oidc
    }
};

export default connect(mapStateToProps)(ProtectedLink);