import React from 'react';
import {Footer} from "react-materialize";

import NavMenu from './NavMenu';

export default (props) => {
    let auth0Logo = (<a width="75" height="25" href="https://auth0.com/?utm_source=oss&utm_medium=gp&utm_campaign=oss" target="_blank" alt="Single Sign On & Token Based Authentication - Auth0"><img width="150" height="50" alt="JWT Auth for open source projects" src="//cdn.auth0.com/oss/badges/a0-badge-light.png"/></a>);
    return (
        <div style={styles.parent}>
            <NavMenu showProfile={false} auth={props.auth}/>
            <div style={styles.col}>
                <div style={styles.devBanner}>
                    Application is early access and is currently unstable. Expect features to change or break.
                </div>
                <div className={'main-content'} style={styles.content}>
                    {props.children}
                </div>
                <Footer
                    copyrights="&copy; 2019 Christopher Fowers"
                    links={auth0Logo}
                >
                </Footer>
            </div>
        </div>
    );
};

const styles = {
    devBanner: {
        backgroundColor: 'red', 
        color: 'white', 
        padding: 7
    },
    parent: {
        width: '100vw', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column'
    },
    content: {
        width: '100vw', 
        flex: 1
    },
    col: {
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column'
    }
};
