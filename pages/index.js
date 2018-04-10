import Link from "next/link";
import Head from "next/head";
import React from "react";
// import S from "string";
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
import {
  Drawer,
  Toolbar,

} from "react-md"
import Boards from "../components/Boards"
import CardList from "../components/CardList"
import { initStore, fetchBoards, fetchCards } from '../store'
import withRedux from '../lib/withRedux'

class TrelloAgg extends React.Component {
  // static async getInitialProps(ctx) {

  // }

  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {

    return (
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
        <Boards />
        <CardList />

      </div>
    );
  }
}

export default withRedux(initStore, null, null)(TrelloAgg)