import * as React from "react"
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import {useState} from "react";
import {shallowEqual, useSelector} from "react-redux";

type Props = {
    savePerson: (person: IPerson | any) => void
}

const styles = {
    root: {
        width: '100%',
    },
    fullwidth: {
        width: '100%',
    },
    card: {
        margin: 'auto',
        minWidth: '350px',
        padding: 16,
    },
    container: {
        display: 'block',
        margin: '10% auto',
        overflow: 'hidden',
        padding: 10,
    },
    btn: {
        background: 'rgb(25, 118, 210)',
        width: '100%',
        color: '#fff',
    },
    warning: {
        color: 'red',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    text: {
        paddingBottom: 8,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
};

// @ts-ignore
const useStyles = makeStyles(styles);

export const AddPerson: React.FC<Props> = ({ savePerson }) => {
    const [error, setError] = useState('');
    const classes = useStyles();
    const persons: readonly IPerson[] = useSelector(
        (state: PersonState) => state.persons,
        shallowEqual
    )
    const userExist = ({ branchId = 0, userName = '' }) => {
        const user = persons.filter(person => person.branchId === branchId
            && person.userName?.toLocaleLowerCase() === userName.toLocaleLowerCase() )
        console.log({ user, persons, branchId, userName });
        return user.length > 0;
    }

    const addNewPerson = (e: React.FormEvent) => {
        e.preventDefault()
        const target = e.target as typeof e.target & IPersonField;
        const branchId = Number(target.branchId.value);
        const userName = target.userName.value;
        const password = target.password.value;
        const firstName = target.firstName.value;
        const middleName = target.middleName.value;
        const lastName = target.lastName.value;
        const position = target.position.value;
        if (userExist({branchId, userName })){
            setError('User name and Branch Id already exists')
        } else {
            savePerson({ branchId, userName, password, firstName, middleName, lastName, position  })
            const form = e.target as HTMLFormElement;
            form.reset();
        }
    }

    const handleOnChange = (e: React.SyntheticEvent) => {
        setError('');
    }

    const handleReset = () => {
        setError('');
    }

    const renderField = ({ id = '', label= '', placeholder= '', type= 'string', value = '' }) => {
        return (
            <Grid item className={classes.fullwidth}>
                <TextField
                    fullWidth
                    id={id}
                    label={label}
                    placeholder={placeholder}
                    variant="outlined"
                    required
                    type={type}
                    defaultValue={value}
                />
            </Grid>
        )
    }

    return (
        <Card className={classes.card}>
            <form onSubmit={addNewPerson} onChange={handleOnChange} onReset={handleReset}>
                <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                    <Grid item className={classes.fullwidth}>
                        <span className={classes.text}>ADD USER</span>
                    </Grid>
                    {renderField({ id: 'branchId', label: 'Branch Id', placeholder: 'Enter Branch id', type: 'number' })}
                    {renderField({ id: 'userName', label: 'User name', placeholder: 'Enter User Name' })}
                    {renderField({ id: 'password', label: 'Password', placeholder: 'Enter Password' })}
                    {renderField({ id: 'firstName', label: 'First Name', placeholder: 'Enter First Name' })}
                    {renderField({ id: 'middleName', label: 'Middle Name', placeholder: 'Enter Middle Name' })}
                    {renderField({ id: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name' })}
                    {renderField({ id: 'position', label: 'Position', placeholder: 'Enter position' })}
                    <Grid item className={classes.fullwidth}>
                        <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                            <Grid item>
                                <Button variant="contained" type="reset" className={classes.btn}>Reset</Button>
                            </Grid>
                            <Grid item >
                                <Button variant="contained" type="submit" className={classes.btn}>Save</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Collapse in={!!error} >
                        <span className={classes.warning}>
                            {error}
                        </span>
                    </Collapse>
                </Grid>
            </form>
        </Card>
    )
}
