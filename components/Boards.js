import Link from "next/link";
import Head from "next/head";
import React from "react";
// import S from "string";
import { bindActionCreators } from 'redux'
import { fetchCards, fetchBoards, changeFilter } from '../store'
import { connect } from 'react-redux'
import BoardItem from "../components/BoardItem"
import { withRouter } from 'next/router'
import {
    Avatar,
    Divider,
    FontIcon,
    List,
    ListItem,
    Subheader,
    Drawer,
    Toolbar,
    CircularProgress,
    FocusContainer,
} from 'react-md';


import NoSSR from "react-no-ssr";
import Paper from "react-md/lib/Papers";
import TextField from "react-md/lib/TextFields";
import Button from "react-md/lib/Buttons/Button";

import { getUrl } from "../lib/util";

class Boards extends React.Component {
    static async getInitialProps(ctx) {

    }

    constructor(props) {
        super(props);
        this.state = {
            filter: null
        }
    }
    componentDidMount() {
        this.props.fetchBoards()
        // const boardsRsp = await fetch(getUrl("/api/boards"))
        // const boards = await boardsRsp.json()

        // this.setState({ boards })

    }

    handleFilterChange(newValue) {
        let { router } = this.props;
        let { pathname, query } = router
        query = Object.assign({}, query, { filter: newValue })
        const newUrl = { pathname, query }
        router.replace(newUrl, newUrl, { shallow: true })
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { boards } = this.props;
        return !boards || boards.length < 1
    }

    render() {
        let { boards, router } = this.props;

        let { filter } = router.query;
        if (!filter) {
            filter = ''
        }

        // let  { query: { name } }  = url
        if (!boards || boards.length === 0) {
            return <CircularProgress scale={ 4 } primary />
        }
        const drawerList =
            <List >
                <Subheader primaryText="all the boards" primary />
                <Divider inset />
                {
                    boards.map(v => <ListItem
                        key={ v.id }
                        primaryText={ v.name }
                        leftIcon={
                            <a href={ v.shortUrl } target="_blank" >         <FontIcon>link</FontIcon>
                            </a>
                        }
                    />)
                }
            </List>
        const position = "left";


        return <FocusContainer
            focusOnMount
            component="div"
            className="trello-boards"
            onSubmit={ e => e.preventDefault() }
            aria-labelledby="contained-form-example"
            containFocus={ true }
        >

            <Drawer
                id="simple-drawer-example"
                type={ Drawer.DrawerTypes.PERSISTENT }
                // visible={ true }
                position={ position }
                // onVisibilityChange={ this.handleVisibility }
                navItems={ boards.map(v => <BoardItem key={ v.id } data={ v } />) }
                header={ (
                    <Toolbar
                        nav={ <TextField label="filter word,maybe your name" id="filter-input" value={ filter }
                            onChange={ value => this.handleFilterChange(value) } /> }
                        //   actions={ isLeft ? closeBtn : null }
                        className="md-divider-border md-divider-border--bottom"
                    />
                ) }
            />
        </FocusContainer>
    }
}


const mapStateToProps = ({ boards }) => ({ boards })

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCards: bindActionCreators(fetchCards, dispatch),
        fetchBoards: bindActionCreators(fetchBoards, dispatch),
        changeFilter: bindActionCreators(changeFilter, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Boards))
