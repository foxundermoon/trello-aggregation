import {
    createStore,
    applyMiddleware
} from 'redux'
import {
    composeWithDevTools
} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import {
    getUrl
} from "./lib/util";


const initialState = {
    boards: [],
    cards: [],
    loadingCard: false,
    filter: ''
}

export const actionTypes = {
    FETCH_BOARDS: 'FETCH_BOARDS',
    FETCH_CARD: 'FETCH_CARD',
    CHANGE_FETCH_CARD_STATUS: "CHANGE_FETCH_CARD_STATUS",
    CHANGE_FILTER: "CHANGE_FILTER",
}
// REDUCERS
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BOARDS:
            return Object.assign({}, state, {
                boards: action.boards,
            })
        case actionTypes.FETCH_CARD:

            return Object.assign({}, state, {
                cards: action.cards,
            })
        case actionTypes.CHANGE_FETCH_CARD_STATUS:
            return Object.assign({}, state, {
                loadingCard: action.loading,
            })

        case actionTypes.CHANGE_FILTER:
            return Object.assign({}, state, {
                filter: action.filter
            })
        default:
            return state
    }
}

// ACTIONS
export const fetchBoards = () => async dispatch => {

    const boardsRsp = await fetch(getUrl("/api/boards"))
    const boards = await boardsRsp.json()
    return dispatch({
        type: actionTypes.FETCH_BOARDS,
        boards,
    })
}

export const fetchCards = (boardId) => async dispatch => {
    dispatch({
        type: actionTypes.CHANGE_FETCH_CARD_STATUS,
        loading: true,
        boardId,
    });
    const url = getUrl("/api/cards", {
        boardId
    });
    const cardsRsp = await fetch(url)
    const cards = await cardsRsp.json()
    dispatch({
        type: actionTypes.FETCH_CARD,
        boardId,
        cards,
    })

    dispatch({
        type: actionTypes.CHANGE_FETCH_CARD_STATUS,
        loading: false,
        boardId,
    })
}

export const changeFilter = (filter) => {
    return dispatch({
        action: actionTypes.CHANGE_FILTER,
        filter,
    })
}


export const initStore = (initialState = initialState) => {
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}