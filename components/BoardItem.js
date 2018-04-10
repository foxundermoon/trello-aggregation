

import React, { Component } from "react";
import Link from "next/link"
import { bindActionCreators } from 'redux'
import { fetchCards, fetchBoards } from '../store'
import { connect } from 'react-redux'
import {
    ListItem,
    FontIcon,
    Avatar,
} from "react-md"
import S from "string"
class BoardItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showLink: false,
        }
    }

    render() {
        const { data } = this.props
        const icon = this.state.showLink ? <a href={ data.shortUrl } target="_blank" >         <FontIcon>link</FontIcon>
        </a> : null
        const avatarIcon = (name => {
            if (S(data.name).contains("移动"))
                return <FontIcon primary>android</FontIcon>
            if (S(data.name).contains("数据"))
                return <FontIcon secondary>folder_shared</FontIcon>
            if (S(data.name).contains("平台"))
                return <FontIcon primary>computer</FontIcon>
            return <FontIcon>archive</FontIcon>

        })(data.name);


        return <ListItem
            primaryText={ data.name }
            leftAvatar={ <Avatar icon={ avatarIcon } /> }
            onMouseMove={ e => this.setState({ showLink: true }) }
            onMouseLeave={ e => this.setState({ showLink: false }) }
            leftIcon={
                icon
            }
            onClick={ () => this.props.fetchCards(data.id) }
        />
    }
}

const mapStateToProps = ({ boards }) => ({ boards })

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCards: bindActionCreators(fetchCards, dispatch),
        fetchBoards: bindActionCreators(fetchBoards, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardItem)

