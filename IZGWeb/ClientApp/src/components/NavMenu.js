import React from "react";
import { Navbar, NavItem, Icon, Dropdown } from "react-materialize";

import Logo from "../Images/logo.png"

import userManager from "../utils/userManager";
import "./NavMenu.css";

import {connect} from "react-redux";
import SideNavMenu from "./SideNaveMenu";
import Profile from "./Profile";


function NavMenuComponent(props) {
    return (
        <Navbar
            brand={
                <a style={{ textAlign: "left", paddingLeft: 15 }}>
                    <div style={{display: 'flex'}}>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                            <img src={Logo} alt={""} style={{height: 46, width: 46, marginRight: 9}} />
                        </div>
                        IZG
                    </div>
                </a>
            }
            alignLinks="right"
            centerLogo={false}
            sidenav={<SideNavMenu
                showProfile={false}
                onLoginClicked={() => {}}
                onLogoutClicked={() => {}}/>}
            menuIcon={<Icon>menu</Icon>}
            className="blue-grey white-text"
        >
            <NavItem>
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
                            {/*<a href="#">*/}
                            {/*    one*/}
                            {/*</a>*/}
                            {/*<a href="#">*/}
                            {/*    two*/}
                            {/*</a>*/}
                            {/*<Divider/>*/}
                            <a onClick={() => userManager.signoutRedirect()}>
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    Sign Out
                                    <Icon style={{lineHeight: 17, height: 17}}>power_settings_new</Icon>
                                </div>
                            </a>
                        </Dropdown> :
                        <button onClick={() => {userManager.signinRedirect()}}>Login</button>
                }
            </NavItem>
        </Navbar>
    )
}
const mapStateToProps = state => {
    return {
        user: state.oidc.user
    }
};

export default connect(mapStateToProps)(NavMenuComponent);