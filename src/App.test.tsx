import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { createStore, applyMiddleware, Store, compose } from "redux"

import { Provider } from "react-redux"
import thunk from "redux-thunk"
import reducer from "./store/reducer";
describe('Login App', () => {
    afterEach(() => jest.clearAllMocks());
    it('should display login ', () => {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        const store: Store<PersonState, PersonAction> & {
            dispatch: DispatchType
        } = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

        render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        expect(screen.getAllByText(/LOGIN/i)[0]).toBeInTheDocument();
    });
    test('should fail with wrong credentials ', () => {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        const store: Store<PersonState, PersonAction> & {
            dispatch: DispatchType
        } = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

        render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        // click login with empty value
        act(() => {
            userEvent.click(screen.getByTestId('btn-login'));
        });
        expect(screen.getAllByText('Invalid Branch Id/UserName/Password')[0]).toBeInTheDocument();
    });
    test('should enter the correct credentials and redirect to dashboard', () => {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        const store: Store<PersonState, PersonAction> & {
            dispatch: DispatchType
        } = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

        render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        const branchIdField  = screen.getByTestId('branchIdInput').querySelector('input')
        expect(branchIdField ).toBeInTheDocument()
        const userNameField  = screen.getByTestId('userNameInput').querySelector('input')
        expect(userNameField ).toBeInTheDocument()
        const passwordField  = screen.getByTestId('passwordInput').querySelector('input')
        expect(passwordField ).toBeInTheDocument()
        // @ts-ignore
        userEvent.type(branchIdField, "10001");
        // @ts-ignore
        userEvent.type(userNameField, "testuser01");
        // @ts-ignore
        userEvent.type(userNameField, "pa55w0rd001");
        act(() => {
            userEvent.click(screen.getByTestId('btn-login'));
        });
    });
});
