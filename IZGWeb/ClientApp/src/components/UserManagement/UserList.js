import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUsers} from "../../redux/actions/users";
import {Table, Icon} from "react-materialize"

import "./UserList.css";
import { useHistory } from "react-router-dom";
import Loading from "../Utility/Loading";

function UserListItem(props) {
    let history = useHistory();
    return (
        <tr onClick={() => {history.push(`/manage-users/user/${props.user.user_id}`)}}>
            <td style={{textAlign: "center"}}>
                <img style={{height: 32, width: 32, borderRadius: 17}} src={props.user.picture} alt={"profile"}/>
            </td>
            <td>
                {props.user.given_name} {props.user.family_name}
            </td>
            <td className={"hide-on-small-only"}>
                {props.user.email}
            </td>
            <td style={{textAlign: "center"}}>
                <Icon>chevron_right</Icon>
            </td>
        </tr>
    )
}

function UserList(props) {
    let timeSince = Date.now() - props.users.lastCompleted;
    
    if(!props.users.users.length > 0 && !props.users.loading && timeSince > 60000)
        props.getUsers();
    
    let users = [];
    for( let i = 0; i < props.currentUsers.length; i++){
        users.push(<UserListItem key={i} user={props.currentUsers[i]} />)
    }

    if(props.users.isLoading)
        return <Loading style={{height: 64, width: 64, position: 'absolute', top: 'calc(50vh - 32px)', left: 'calc(50vw - 32px)'}} />;
    
    return (
        <Table responsive={false} hoverable={true}>
            <thead className={"hide-on-small-only"}>
                <tr>
                    <th data-field={"picture"}>
                    </th>
                    <th data-field={"given_name"}>
                        Name
                    </th>
                    <th data-field={"email"} className={"hide-on-small-only"}>
                        Email
                    </th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {users}
            </tbody>
        </Table>
    );
}

const mapStateToProps = (state, ownProps) => {
    let currentUsers = state.users.users.slice();
    let startingIndex = ownProps.activePage * ownProps.rowsPerPage - ownProps.rowsPerPage;
    if (currentUsers.length > ownProps.rowsPerPage)
        currentUsers = currentUsers.slice(startingIndex, startingIndex + (ownProps.rowsPerPage));
    
    return {
        user: state.oidc.user,
        users: state.users,
        currentUsers: currentUsers
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(getUsers())
    }
};

UserList.propTypes = {
    activePage: PropTypes.number,
    rowsPerPage: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);