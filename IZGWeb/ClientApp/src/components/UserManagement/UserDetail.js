import React from "react";
import { connect } from 'react-redux';
import {getUsers} from "../../redux/actions/users";
import {Row, Col} from "react-materialize";

function UserDetail(props) {
    if(props.shouldGetUsers)
        props.getUsers();
    if(!props.user) return <div>Loading...</div>;
    return (
        <div style={{display: 'block'}}>
            <img src={props.user.picture} alt={"profile"} />
            <h3>{props.user.name}</h3>
            <Row>
                <Col>
                    Email
                </Col>
                <Col>
                    {props.user.email}
                </Col>
            </Row>
            <Row>
                <Col>
                    Created At
                </Col>
                <Col>
                    {props.user.created_at}
                </Col>
            </Row>
            <Row>
                <Col>
                    Last Login
                </Col>
                <Col>
                    {props.user.last_login}
                </Col>
            </Row>
            <Row>
                <Col>
                    Last IP
                </Col>
                <Col>
                    {props.user.last_ip}
                </Col>
            </Row>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    let indexOfUser = state.users.users.findIndex(u => u.user_id === ownProps.match.params.userId);
    return {
        user: indexOfUser >= 0 ?
            state.users.users[indexOfUser] : 
            null,
        shouldGetUsers: !state.users.users.length 
            && !state.users.loading 
            && !state.users.error 
            && Date.now() - state.users.lastCompleted > 6000
    }
};


const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(getUsers())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);