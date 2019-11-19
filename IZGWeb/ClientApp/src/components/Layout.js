import React from 'react';
import NavMenu from './NavMenu';

export default (props) => {
    return (
        <div style={{width: '100vw'}}>
            <NavMenu showProfile={false} auth={props.auth}/>
            <div style={{width: '100vw'}}>
                {props.children}
            </div>
        </div>
    );
};
