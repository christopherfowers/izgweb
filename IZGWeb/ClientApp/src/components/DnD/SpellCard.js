import React from "react";
import {Card} from "react-materialize"

function SpellCard(props) {
    return (
        <Card
            className="blue-grey darken-1"
            textClassName="white-text"
            title={props.spell.name}
            actions={[<a />,<a />]}
        >
            <div dangerouslySetInnerHTML={{ __html: props.spell.description }} />
        </Card>
    );
}

export default SpellCard;