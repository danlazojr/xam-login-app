import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { removeUser } from "../../store/actionCreators";

const styles = {
    btn: {
        background: 'rgb(25, 118, 210)',
        color: '#fff',
        marginTop: 4,
        marginRight: 8,
    },
};

// @ts-ignore
const useStyles = makeStyles(styles);

export default function Logout() {
    const classes = useStyles();
    const user: IPerson = useSelector(
        (state: PersonState) => state.user,
        shallowEqual
    )
    const dispatch: Dispatch<any> = useDispatch()

    const logout = React.useCallback(
        (person: IPerson ) => dispatch(removeUser(person)),
        [dispatch]
    )

    const onClick = () => logout(user);



    return (<Button variant="contained" onClick={onClick} className={classes.btn}>LOGOUT</Button>);
}
