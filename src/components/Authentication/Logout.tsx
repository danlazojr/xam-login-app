import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { removeUser } from "../../store/actionCreators";
import {Grid} from "@material-ui/core";

const styles = {
    btn: {
        background: 'rgb(25, 118, 210)',
        color: '#fff',
        marginTop: 4,
        marginRight: 8,
    },
    label: {
        color: '#fff',
        padding: 8,
        margin: 0,
    }
};

type Props = {
    showUser: boolean,
}


// @ts-ignore
const useStyles = makeStyles(styles);

export const Logout: React.FC<Props> = ({ showUser }) => {
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
    if (showUser){
        return (
            <Grid container>
                <Grid item>
                    <h3 className={classes.label}>
                        {user.userName}
                    </h3>
                </Grid>
                <Grid item xs>
                    <Button variant="contained" onClick={onClick} className={classes.btn}>LOGOUT</Button>
                </Grid>
            </Grid>
        )
    }

    return (<Button variant="contained" onClick={onClick} className={classes.btn}>LOGOUT</Button>);
}
