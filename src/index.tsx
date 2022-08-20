import * as React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware, Store, compose } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import './index.css';

import App from "./App"
import reducer from "./store/reducer"

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<PersonState, PersonAction> & {
    dispatch: DispatchType
} = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

const rootElement = document.getElementById("root")
render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)
