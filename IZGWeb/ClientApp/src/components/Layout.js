import React from 'react';
import {Footer} from "react-materialize";

import NavMenu from './NavMenu';

export default (props) => {
    return (
        <div style={{width: '100vw'}}>
            <NavMenu showProfile={false} auth={props.auth}/>
            <div className={'main-content'} style={{width: '100vw', height: '100vhs '}}>
                {props.children}
            </div>
            <Footer>
                <a width="150" height="50" href="https://auth0.com/?utm_source=oss&utm_medium=gp&utm_campaign=oss" target="_blank" alt="Single Sign On & Token Based Authentication - Auth0"><img width="150" height="50" alt="JWT Auth for open source projects" src="//cdn.auth0.com/oss/badges/a0-badge-light.png"/></a>    
            </Footer>
        </div>
    );
};
