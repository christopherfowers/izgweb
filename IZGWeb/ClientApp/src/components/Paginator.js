import React from "react";

function Paginator(props) {
    return (
        <div>
            Hello Paginator
        </div>
    )
}

Paginator.propTypes = {
    pageCount: PropTypes.number,
    currentPage: PropTypes.number,
    onPageSelected: PropTypes.func
};

export default Paginator;