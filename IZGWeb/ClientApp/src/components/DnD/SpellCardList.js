import React from "react";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize"

function SpellCardList(props) {
    let spellCards = [];
    
    for(let i = 0; i < props.spells.length; i++) {
        let spell = props.spells[i];
        spellCards.push(
            <CollapsibleItem header={spell.name} icon={<Icon>menu</Icon>} key={spell.id}>
                <div dangerouslySetInnerHTML={{ __html: spell.description }} />
            </CollapsibleItem>
        );
    }
    return (
        <Collapsible accordion={false}>
            {spellCards}
        </Collapsible>
    )
}

export default SpellCardList;