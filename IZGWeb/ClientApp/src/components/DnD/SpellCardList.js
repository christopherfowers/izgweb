import React, {useState, useEffect} from "react";
import {TextInput, Collapsible, CollapsibleItem, Icon, Pagination} from "react-materialize"
import {connect} from "react-redux";
import {getSpells} from "../../redux/actions/spell";

import SpellList from "./SpellList";

function SpellCardList(props) {
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    let filteredSpells = props.spells.spells.filter(s => s.name.indexOf(filter) >= 0);
    let pages = Math.ceil(filteredSpells.slice().length / 10);
    
    return (
        <div style={{display: "block"}}>
            <div>
                <TextInput
                    icon="search" 
                    label="Search spells"
                    onChange={(e) => { 
                        setFilter(e.target.value);
                    }} />
            </div>
            <SpellList filterText={filter} activePage={currentPage}/>
            {
                pages > 1 ?
                    <div style={{display: 'flex', justifyContent: 'space-around', textAlign: 'center'}}>
                        <Pagination activePage={currentPage} maxButtons={pages} onSelect={(selectedPage) => setCurrentPage(selectedPage)} />
                    </div> :
                    null
            }
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        spells: state.spells,
        user: state.oidc.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSpells: () => dispatch(getSpells())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SpellCardList);