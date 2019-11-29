import "./UserList.css";

import React, { useState } from "react";
import {connect} from "react-redux";
import {getUsers} from "../../redux/actions/users";
import {Pagination} from "react-materialize"

import UserList from "./UserList";

function UserDasheboard(props) {
    const [currentPage, setCurrentPage] = useState(1);
    
    return (
        <div style={{display: 'block'}}>
            <UserList activePage={currentPage} rowsPerPage={10} />
            {
                props.pages > 1 ?
                    <div style={{display: 'flex', justifyContent: 'space-around', textAlign: 'center'}}>
                        <Pagination activePage={currentPage} maxButtons={props.pages} onSelect={(selectedPage) => setCurrentPage(selectedPage)} />
                    </div> :
                    null
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.oidc.user,
        users: state.users,
        pages: Math.ceil(state.users.users.length / 10)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(getUsers())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDasheboard);