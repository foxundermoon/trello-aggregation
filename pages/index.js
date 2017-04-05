import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import m1 from '../lib/m1.json'
import m2 from '../lib/m2.json'
import m3 from '../lib/m3.json'
import S from 'string'
import Paper from 'react-md/lib/Papers'
import Divider from 'react-md/lib/Dividers'
import TextField from 'react-md/lib/TextFields'
import List from 'react-md/lib/Lists/List'
import ListItem from 'react-md/lib/Lists/ListItem'
import Subheader from 'react-md/lib/Subheaders'
import FocusContainer from 'react-md/lib/Helpers/FocusContainer'
import Switch from 'react-md/lib/SelectionControls/Switch'
export default class extends React.Component {
    static async getInitialProps(ctx) {
        let data = [{c: m1, l: '2017-1'}, {c: m2, l: '2017-2'}, {c: m3, l: '2017-3'}]
            .map(item => ({
                l: item.l,
                cs: item.c.cards //.filter(ii=>ii.name.indexOf(name)>0).map(i=>i.name)
            }))
        return {data}
    }

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            skeep: true
        }
    }

    render() {
        let {query} = this.props.url
        if (query) {
            let {name} = query
            if (name) this.setState({name})
        }
        let {data} = this.props
        let skeep = 85
        let input =
            <div>
                <Head>
                    <link rel='stylesheet' href='/static/react-md.light_blue-yellow.min.css'/>
                    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'/>
                    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Material+Icons'/>
                </Head>
                <div className="md-grid">
                    <TextField
                        className="md-cell md-cell--6"
                        id="keyword-input"
                        type="text"
                        label="input key word or your name"
                        value={this.state.name}
                        onChange={e => this.setState({name: e.target.value})}/>
                    <Switch className="md-cell" id="switch1" name="lights" label="skeep the useless head"
                            checked={this.state.skeep} onChange={c => this.setState({skeep: c})}/>
                </div>
            </div>


        if (data) {
            return (
                <FocusContainer
                    focusOnMount
                    component="div"
                    className="q1-board"
                    onSubmit={function noSubmit(e) {
                        e.preventDefault();
                    }}
                    aria-labelledby="contained-form-example"
                    containFocus={true}
                >
                    {input}
                    <div className="paper-container md-grid">
                        {data.map((item, i) => (<Paper key={i}
                                                       zDepth={5}
                                                       className="paper-month md-cell"
                            >
                                <Subheader primaryText={item.l}/>
                                <Divider />
                                <List>
                                    {item.cs.filter((_, i2) => this.state.skeep ? i2 > skeep : true).filter((ii, i2) => S(ii.name).contains(this.state.name) && S(ii.name).length > 5).map((card, i2) => (
                                        <ListItem key={i2} primaryText={card.name}/>
                                    ))}
                                </List>
                            </Paper>)
                        )}
                    </div>
                </FocusContainer>
            )
        } else {
            return (<TextField primaryText="not any data  please refresh or submit bug to coder"/>)
        }
    }
}