

import React, { Component } from "react";
import Link from "next/link"
// import { connect } from 'react-redux'

import {
    ListItem,
    FontIcon,
} from "react-md"
export default class CardItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showLink: false,
        }
    }


    render() {
        const { data: item } = this.props
        const icon = this.state.showLink ? (<a
            href={ item.shortUrl }
            target="_blank" >
            <FontIcon>link</FontIcon>
        </a>
        ) : null

        const { name, listName } = item

        return <ListItem
            secondaryText={ name }
            primaryText={ listName }
            onMouseMove={ e => this.setState({ showLink: true }) }
            onMouseLeave={ e => this.setState({ showLink: false }) }
            leftIcon={
                icon
            }
        />;
    }
}


