import React from "react";
import {connect} from "react-redux"
import userManager from "../utils/userManager";
import { Card, Button} from "react-materialize"
import {Redirect} from "react-router-dom";

function Login(props) {
    if (props.user && !props.user.expired) 
        return <Redirect to="/" />;
    return (
        <div style={{...styles.parent, ...styles.lightBg}}>
            <div style={styles.row}>
                <div style={styles.col}>
                    <h5>The best gaming community for people with lives.</h5>
                </div>
                <div  style={styles.col}>
                    <Card style={{padding: 14}}>
                        <p>
                            You must have an account to access this site.
                            <br />
                            Don't have an account? No worries! Just 
                            click login and then select the 'Sign Up' tab to register!
                        </p>
                        <p>
                            <Button onClick={() => userManager.signinRedirect()} >
                                Login
                            </Button>
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const styles = {
    parent: {
        display: 'block',
        padding: 20
    },
    lightBg: {
        backgroundColor: '#fff',
        color: '#222'
    },
    darkBg: {
        backgroundColor: '#222',
        color: '#fff'
    },
    row: {
        display: 'flex', 
        margin: 'auto',
        flexWrap: 'wrap'
    },
    col: { 
        flex: 1, 
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'space-around',
        minWidth: 300
    }
}

const mapStateToProps = state => {
    return {
        user: state.oidc.user
    }
};

export default connect(mapStateToProps)(Login);