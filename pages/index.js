import Link from "next/link";
import Head from "next/head";
import React from "react";
import m7 from "../lib/m7.json";
import m8 from "../lib/m8.json";
import m9 from "../lib/m9.json";
import S from "string";
import NoSSR from "react-no-ssr";
import Paper from "react-md/lib/Papers";
import Divider from "react-md/lib/Dividers";
import TextField from "react-md/lib/TextFields";
import List from "react-md/lib/Lists/List";
import ListItem from "react-md/lib/Lists/ListItem";
import Subheader from "react-md/lib/Subheaders";
import FocusContainer from "react-md/lib/Helpers/FocusContainer";
import Switch from "react-md/lib/SelectionControls/Switch";
import CSSTransitionGroup from "react-addons-css-transition-group";
import CircularProgress from "react-md/lib/Progress/CircularProgress";
import Button from "react-md/lib/Buttons/Button";

export default class extends React.Component {
  static async getInitialProps(ctx) {
    let data = [
      { c: m7, l: "2017-7" },
      { c: m8, l: "2017-8" },
      { c: m9, l: "2017-9" }
    ].map(item => ({
      l: item.l,
      cs: item.c.cards.map(i => ({
        name: i.name,
        link: i.shortLink,
        date: i.dateLastActivity.split("T")[0]
      }))
      //.filter(ii=>ii.name.indexOf(name)>0).map(i=>i.name)
    }));
    return { data };
  }

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      skeep: true
    };
  }
  componentWillMount() {
    let { query } = this.props.url;
    if (query) {
      let { name } = query;
      if (name) this.setState({ name });
    }
  }

  render() {
    let { data } = this.props;
    let skeep = 85;
    let input = (
      <div>
        <Head>
          <link
            rel="stylesheet"
            href="/static/react-md.light_blue-yellow.min.css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Material+Icons"
          />
        </Head>
        <div className="md-grid">
          <TextField
            className="md-cell md-cell--4"
            id="keyword-input"
            type="text"
            label="input key word or your name"
            value={this.state.name}
            onBlur={() => this.forceUpdate()}
            onChange={name => this.setState({ name })}
          />
          <Switch
            className="md-cell md-cell--middle"
            id="switch1"
            name="lights"
            label="skeep the useless head"
            checked={this.state.skeep}
            onChange={c => this.setState({ skeep: c })}
          />
        </div>
      </div>
    );

    if (data) {
      return (
        <FocusContainer
          focusOnMount
          component="form"
          className="q1-board"
          onSubmit={function noSubmit(e) {
            e.preventDefault();
          }}
          aria-labelledby="contained-form-example"
          containFocus={true}
        >
          {input}
          <NoSSR onSSR={<Load />}>
            <div className="paper-container md-grid">
              {data.map((item, i) => (
                <Paper key={i} zDepth={5} className="paper-month md-cell">
                  <Subheader primaryText={item.l} />
                  <Divider />
                  <List>
                    {item.cs
                      .filter((_, i2) => (this.state.skeep ? i2 > skeep : true))
                      .filter(
                        (ii, i2) =>
                          S(ii.name).contains(this.state.name) &&
                          S(ii.name).length > 5
                      )
                      .map((card, i2) => (
                        <ListItem
                          style={{ "word-break": "break-all" }}
                          key={i2}
                          secondaryText={card.name}
                          primaryText={card.date}
                          threeLines
                          onClick={e=>window.open(`https://trello.com/c/${card.link}`,"__blank")}
                        />
                      ))}
                  </List>
                </Paper>
              ))}
            </div>
          </NoSSR>
        </FocusContainer>
      );
    } else {
      return (
        <TextField primaryText="not any data  please refresh or submit bug to coder" />
      );
    }
  }
}

const Load = () => <span>loading ...</span>;
