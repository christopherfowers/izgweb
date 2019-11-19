import React from 'react';
// import {Icon} from "react-materialize";

function Profile(props) {
    return (
        <div style={styles.row}>
            <div style={{...styles.col, marginRight: 7}}>
                <img src={props.picture} alt={"Profile"} style={styles.profilePicture} />
            </div>
            <div style={styles.col}>
                { props.name ? props.name : null }
            
                {/*<div onClick={() => {props.onLogoutClicked()}}>*/}
                {/*    <Icon>power_settings_new</Icon>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

const styles = {
   profilePicture: {
       height: 32,
       width: 32,
       borderRadius: 16
   },
   row: {
       display: "flex", 
       flexDirection: 'row', 
       justifyContent: 'space-between'
   },
   col: {
        height: 64,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
   }
};

export default Profile;
