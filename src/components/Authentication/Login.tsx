import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import {Navigate} from "react-router-dom";
import { Dispatch } from "redux"
import { addUser } from "../../store/actionCreators";

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

export default function Login() {
    const [person, setPerson] = React.useState<IPerson | {}>()
    const [error, setError] = useState('');
    const persons: readonly IPerson[] = useSelector(
        (state: PersonState) => state.persons,
        shallowEqual
    )
    const classes = useStyles();
    const dispatch: Dispatch<any> = useDispatch()

    const savePerson = React.useCallback(
        (person: IPerson ) => dispatch(addUser(person)),
        [dispatch]
    )

    const [newUser, setUser] = React.useState<IPerson | {}>()

    const user: IPerson = useSelector(
        (state: PersonState) => state.user,
        shallowEqual
    )

    if (user.branchId){
        return <Navigate to="/" replace={true} />
    }

    const validateUser = ({ branchId = 0, userName = '', password = '' }) => {
        const user = persons.filter(person => person.branchId === branchId
            && person.userName?.toLocaleLowerCase() === userName.toLocaleLowerCase()
            && password.toLocaleLowerCase() === person.password?.toLocaleLowerCase() )
        if (user.length) {
            return user[0];
        }
        return null;
    }

    const onValidSubmit = (e: React.SyntheticEvent)  => {
        e.preventDefault();
        const target = e.target as typeof e.target & IUserField;
        const branchId = Number(target.branchId?.value);
        const userName = target.userName?.value;
        const password = target.password?.value;

        const newUser = validateUser({ branchId: branchId, userName, password });
        if (newUser){
            savePerson(newUser)
        }else {
            setError('Invalid Branch Id/UserName/Password')
        }

    }

    const handleOnChange = (e: React.SyntheticEvent) => {
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
                    data-testid={`${id}Input`}
                />
            </Grid>
        )
    }

    return (
        <div className={classes.container}>
            <Card className={classes.card}>

                <form onSubmit={onValidSubmit} onChange={handleOnChange}>

                    <Grid container direction="column" spacing={2} alignItems="center" justifyContent="center">
                        <Grid item className={classes.fullwidth}>
                            <span className={classes.text}>LOGIN</span>
                        </Grid>
                        {renderField({ id: 'branchId', label: 'Branch Id', placeholder: 'Enter Branch id', type: 'number' })}
                        {renderField({ id: 'userName', label: 'User Name', placeholder: 'Enter Username' })}
                        {renderField({ id: 'password', label: 'Password', placeholder: 'Enter Password' })}
                        <Grid item className={classes.fullwidth}>
                            <Button variant="contained" type="submit" className={classes.btn} data-testid="btn-login">LOGIN</Button>
                        </Grid>
                        <Collapse in={!!error} >
                            <span className={classes.warning}>
                                {error}
                            </span>
                        </Collapse>
                    </Grid>
                </form>
           </Card>
        </div>
    )
}
