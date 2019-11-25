import {NavItem, Icon, Dropdown, Navbar} from "react-materialize";
import React from "react";

import './index.css';
import ul from "eslint-plugin-jsx-a11y/src/util/implicitRoles/ul";
import Profile from "../Profile";
import userManager from "../../utils/userManager";
import * as config from "../../auth_config";
import ProtectedLink from "../ProtectedLink";

export default (props) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100vh'}}>
            <ul>
                <li>
                    <NavItem>
                        <h4>IZG</h4>
                    </NavItem>
                </li>
                <li>
                    <hr />
                </li>
                <li>

                    <ProtectedLink className="icon-nav-item" to={"/dnd/spells"} acceptedPermissions={["read:gamedata"]} >
                        <div>
                            D&D Spells
                        </div>
                        <div>
                            <Icon>
                                videogame_asset
                            </Icon>
                        </div>
                    </ProtectedLink>
                </li>
            </ul>
            <ul>
                <li>
                    <ProtectedLink className="icon-nav-item" to={"/manage-users"} acceptedPermissions={["read:users"]}>
                        <div>
                            User Admin
                        </div>
                        <div>
                            <Icon>
                                supervisor_account
                            </Icon>
                        </div>
                    </ProtectedLink>
                </li>
                <li>
                    <hr />
                </li>
                <li style={{height: 64}}>
                    <NavItem>
                        {
                            props.user && props.user.expires_in > 0 ?
                                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                    <Profile name={props.user.profile.name} picture={props.user.profile.picture}/>
                                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}} >
                                        <div onClick={() => {
                                            userManager.signoutRedirect();
                                            window.location = `https://islandzgames.auth0.com/v2/logout` +
                                                `?client_id=${config.clientId}` +
                                                `&returnTo=${window.location.protocol}//${window.location.hostname}${window.location.port
                                                    ? `:${window.location.port}` : ''}`
                                        }}><Icon>power_settings_new</Icon></div>
                                    </div>
                                </div> :
                                <button onClick={() => {userManager.signinRedirect()}}>Login</button>
                        }
                    </NavItem>
                </li>
            </ul>
        </div>
    );
}