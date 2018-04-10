import "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCards } from '../store'
import {
    List,
    ListItem,
    Paper,
    AccessibleFakeInkedButton,
    AccessibleFakeButton,
    CircularProgress,
    Badge,
} from "react-md"
import { withRouter } from "next/router"
import CardItem from "./CardItem"
import S from "string";


export default connect(state => state)(withRouter(({ cards, loadingCard, router }) => {


    const style = <style jsx>{ `
        .cards-container{
            margin-left: 270px;
        }
        .center{
            margin: 300px 10px 100px;
        }
        `}
    </style>

    if (loadingCard) {
        return <div className="cards-container center">
            <CircularProgress scale={ 6 } />
            { style }
        </div>
    }
    const { query: { filter } } = router

    const filterdCard = cards.filter(v => {
        const s = S(v.name)
        if (S(filter).length > 0) {
            return s.contains(filter)
        }
        return true
    })

    return <div className="cards-container">
        <div>
            <Badge
                badgeContent={ filterdCard.length }
            >
                filted total item
    </Badge>
            <AccessibleFakeInkedButton className="fakey-fake md-btn md-btn--raised md-background--primary">
                { }
            </AccessibleFakeInkedButton>
        </div>
        <Paper
            zDepth="3"
            className="paper-container md-grid">

            <List>
                {
                    filterdCard.map(item => {
                        return (<CardItem
                            key={ item.id }
                            data={ item }
                        />)
                    }) }
            </List>
            { style }
        </Paper>
    </div>
}
)
)