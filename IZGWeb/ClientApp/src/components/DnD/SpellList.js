import React, {useState} from "react";
import {Collapsible, CollapsibleItem, Icon, Pagination} from "react-materialize";
import {getSpells} from "../../redux/actions/spell";
import {connect} from "react-redux";
import Loading from "../Utility/Loading";

function SpellList(props) {
    let spellCards = [];

    if(!props.spells.spells.length
        && !props.spells.isLoading) {
        if(props.user
            && !props.user.expired
            && !props.spells.error) {
            props.getSpells();
        }
    }

    for(let i = 0; i < props.filteredSpells.length; i++) {
        let spell = props.filteredSpells[i];
        spellCards.push(
            <CollapsibleItem header={spell.name} icon={<Icon>menu</Icon>} key={spell.id}>
                <div dangerouslySetInnerHTML={{ __html: spell.description }} />
            </CollapsibleItem>
        );
    }
    if(props.spells.isLoading)
        return <Loading style={{height: 64, width: 64, position: 'absolute', top: 'calc(50vh - 32px)', left: 'calc(50vw - 32px)'}} />;

    return (
        <React.Fragment>
            <Collapsible accordion={false}>
                {spellCards}
            </Collapsible>
        </React.Fragment>
    )
}

const mapStateToProps = (state, ownProps) => {
    let filteredSpells = state.spells.spells.filter(s => s.name.toLowerCase().indexOf(ownProps.filterText.toLowerCase()) >= 0) || [];
    filteredSpells.sort((a, b) => { return a.name > b.name ? 1 : -1});
    
    let startingIndex = ownProps.activePage * 10 - 10;

    if (filteredSpells.length > 10)
        filteredSpells = filteredSpells.slice(startingIndex, startingIndex + 10);
    
    return {
        spells: state.spells,
        user: state.oidc.user,
        filteredSpells: filteredSpells
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSpells: () => dispatch(getSpells())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SpellList);