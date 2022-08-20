import * as React from "react";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { AddPerson } from "./AddPerson";
import { Person } from "./Person";
import {addPerson, removePerson} from "../../store/actionCreators";
import {makeStyles} from "@material-ui/core/styles";
const styles = {
    root: {
        width: '100%',
    },
    fullwidth: {
        width: '100%',
    },
    card: {
        margin: 'auto',
        maxWidth: '350px',
        padding: 16,
        // textAlign: 'center',
    },
    text: {
        paddingBottom: 8,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    field: {
        backgroundColor: 'rgb(25, 118, 210)',
        color: 'white',
        padding: 8,
    },
};
const useStyles = makeStyles(styles);

export const  PersonList: React.FC = () => {
    const classes = useStyles();
    const persons: readonly IPerson[] = useSelector(
        (state: PersonState) => state.persons,
        shallowEqual
    )

    const dispatch: Dispatch<any> = useDispatch()

    const savePerson = React.useCallback(
        (person: IPerson) => dispatch(addPerson(person)),
        [dispatch]
    )
    const list = () => (
        <TableContainer component={Paper}>
            <Table aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.field}>#</TableCell>
                        <TableCell className={classes.field}>Branch Id</TableCell>
                        <TableCell className={classes.field}>User Name</TableCell>
                        <TableCell className={classes.field}>Password</TableCell>
                        <TableCell className={classes.field}>First Name</TableCell>
                        <TableCell className={classes.field}>Middle Name</TableCell>
                        <TableCell className={classes.field}>Last Name</TableCell>
                        <TableCell className={classes.field}>Position</TableCell>
                        <TableCell className={classes.field}/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {persons.map((person: IPerson, index) => (
                        <React.Fragment>
                            <Person
                                key={person.branchId}
                                person={person}
                                removePerson={removePerson}
                                variant="tableCell"
                                index={index}
                            />
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
    return (

        <Grid container spacing={2} alignItems="baseline" justifyContent="center">
            <Grid item>
                <AddPerson savePerson={savePerson}/>
            </Grid>
            <Grid item>
                {list()}
            </Grid>
        </Grid>
    )
}
