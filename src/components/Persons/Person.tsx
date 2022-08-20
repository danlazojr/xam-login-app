import * as React from "react"
import { Dispatch } from "redux"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
type Props = {
    person: IPerson
    removePerson: (person: IPerson) => void
    variant?: string,
    index: number,
}

const DEFAULT_FIELDS = {
    width: 100,
    align: 'right',
    padding: 8,
}

const styles = {
    live: {
        color: 'white',
        fontWeight: 500,
        position: 'relative',
        background: '#c90000',
        borderRadius: 2,
        padding: '2px 8px',
        paddingLeft: 15,
        marginRight: 4,
        fontSize: 10,
        whiteSpace: 'nowrap',

        '&:before': {
            animation: 'pulsate1 1.2s ease-out',
            animationIterationCount: 'infinite',
            border: '3px solid #fff',
            borderRadius: 5,
            content: "' '",
            left: 5,
            position: 'absolute',
            top: 6,
        },
    },
    cellDelete: {
        textAlign: 'right',
    },
}
// @ts-ignore
const useStyles = makeStyles(styles);
export const Person: React.FC<Props> = ({ person, removePerson, variant, index }) => {
    const dispatch: Dispatch<any> = useDispatch()
    const classes = useStyles();

    const deletePerson = React.useCallback(
        (person: IPerson) => dispatch(removePerson(person)),
        [dispatch, removePerson]
    )
    const user: IPerson = useSelector(
        (state: PersonState) => state.user,
        shallowEqual
    )

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0
        }
    }));

    if (variant === 'tableCell'){
        return (
            <StyledTableRow key={person.branchId}>
                <TableCell style={{...DEFAULT_FIELDS, width: 20}}>
                    {index + 1}
                </TableCell>
                <TableCell style={{...DEFAULT_FIELDS, width: 100}}>
                    {person.branchId}
                </TableCell>
                <TableCell style={DEFAULT_FIELDS}>
                    {person.userName}
                </TableCell>
                <TableCell style={DEFAULT_FIELDS}>
                    {person.password}
                </TableCell>
                <TableCell style={DEFAULT_FIELDS}>
                    {person.firstName}
                </TableCell>
                <TableCell style={DEFAULT_FIELDS}>
                    {person.middleName}
                </TableCell>
                <TableCell style={DEFAULT_FIELDS}>
                    {person.lastName}
                </TableCell>
                <TableCell style={DEFAULT_FIELDS}>
                    {person.position}
                </TableCell>
                    <TableCell style={DEFAULT_FIELDS} className={classes.cellDelete}>
                        { user.branchId !== person.branchId ? (
                            <button onClick={() => deletePerson(person)}>Delete</button>
                        ) : <div className={classes.live}>Current User</div> }
                    </TableCell>

            </StyledTableRow>

        )
    }

    return (
        <div>
            <div>
                <h1>{person.userName}</h1>
                <p>{person.firstName}</p>
            </div>
            <button onClick={() => deletePerson(person)}>Delete</button>
        </div>
    )
}
