import React from "react";
import { Navbar, NavItem, Icon, Dropdown } from "react-materialize";
import { Link } from "react-router-dom";

import Logo from "../Images/logo.png"

import userManager from "../utils/userManager";
import * as config from "../auth_config.json";
import "./NavMenu.css";

import {connect} from "react-redux";
import SideNavMenu from "./SideNaveMenu";
import Profile from "./Profile";
import ProtectedLink from "./ProtectedLink";


function NavMenuComponent(props) {
    return (
        <Navbar
            brand={
                <Link to={"/"} style={{ textAlign: "left", paddingLeft: 15 }}>
                    <div style={{display: 'flex'}}>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                            <img src={Logo} alt={""} style={{height: 46, width: 46, marginRight: 9}} />
                        </div>
                        IZG
                    </div>
                </Link>
            }
            alignLinks="right"
            centerLogo={false}
            sidenav={<SideNavMenu
                user={props.user}
                onLogoutClicked={() => userManager.signoutRedirect()}/>}
            menuIcon={<Icon>menu</Icon>}
            className="blue-grey white-text"
        >
            <ProtectedLink to={"/dnd/spells"} acceptedPermissions={["read:gamedata"]} >
                D&D Spells
            </ProtectedLink>
            <ProtectedLink to={"/manage-users"} acceptedPermissions={["read:users"]}>
                User Admin
            </ProtectedLink>
            {
                props.user && props.user.expires_in > 0 ?
                    <Dropdown
                        trigger={
                            <a>
                                <Profile name={props.user.profile.name}
                                         picture={props.user.profile.picture}/>
                            </a>
                        }
                        options={{coverTrigger: false, belowOrigin: true, hover: false}}>
                        <a onClick={() => {
                            userManager.signoutRedirect();
                            window.location = `https://islandzgames.auth0.com/v2/logout` + 
                                `?client_id=${config.clientId}` +
                                `&returnTo=${window.location.protocol}//${window.location.hostname}${window.location.port 
                                    ? `:${window.location.port}` : ''}`
                        }}>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                Sign Out
                                <Icon style={{lineHeight: 17, height: 17}}>power_settings_new</Icon>
                            </div>
                        </a>
                    </Dropdown> :
                    null
            }
        </Navbar>
    )
}
const mapStateToProps = state => {
    return {
        user: state.oidc.user
    }
};

export default connect(mapStateToProps)(NavMenuComponent);