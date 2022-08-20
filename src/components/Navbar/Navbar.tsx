import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Logout from "../Authentication/Logout";

const styles = {
    btn: {
        background: 'rgb(25, 118, 210)',
        // width: '100%',
        color: '#fff',
        marginTop: 4,
        marginRight: 8,
    },
    text: {
        paddingBottom: 8,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    container: {
        textAlign: 'end',
    },
    nav: {
      background: '#002ead',
        marginBottom: 24,
        height: 48,
    },
};

// @ts-ignore
const useStyles = makeStyles(styles);

export default function Navbar() {
    const classes = useStyles();
    return (
        <nav className={classes.nav}>
            <div className={classes.container}>
                <Logout />
            </div>
        </nav>
    )
}
