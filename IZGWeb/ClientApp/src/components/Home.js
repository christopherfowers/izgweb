import React, { Component } from "react";
import {connect} from "react-redux";
import SpellCardList from "./DnD/SpellCardList";
import { getSpells } from "../redux/actions/spell";

let HomeComponent = class Home extends Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null, profile: {} };
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.props.spells.spells.length 
            && !this.props.spells.isLoading) {
            if(this.props.user 
                && !this.props.user.expired
                && !this.props.spells.error) {
                this.props.getSpells();
            }
        }
    }

    render() {
        return(
            <div style={{width: '100vw'}}>
                {
                    this.props.user ? this.props.user.access_token : null
                }
                <p />
                {
                    this.props.user ? this.props.user.id_token : null
                }
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        user: state.oidc.user,
        spells: state.spells
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSpells: () => dispatch(getSpells())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);


