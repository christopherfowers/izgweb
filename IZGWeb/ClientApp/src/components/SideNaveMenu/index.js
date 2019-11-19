import {NavItem, Icon} from "react-materialize";
import React from "react";

import './index.css';
import ul from "eslint-plugin-jsx-a11y/src/util/implicitRoles/ul";

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
                    <NavItem className="icon-nav-item">
                        <div>
                            Games
                        </div>
                        <div>
                            <Icon>
                                videogame_asset
                            </Icon>
                        </div>
                    </NavItem>
                </li>
            </ul>
            <ul>
                <li>
                    <hr />
                </li>
                <li>
                    
                    <NavItem>
                        { }
                    </NavItem>
                </li>
            </ul>
        </div>
    );
}