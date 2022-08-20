import * as actionTypes from "./actionTypes"
import {users} from "./users_data";

/*const normalizeData = users.reduce((prev, curr) => {
    return [...prev, {[curr.branchId]: {...curr}} ]
}, [])*/

const userEmpty = {
    branchId: 0,
    userName: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    position: '',
};

const initialState: PersonState = {
    persons: users,
    user: userEmpty,
}


const reducer = (
    state: PersonState = initialState,
    action: PersonAction
): PersonState => {
    switch (action.type) {
        case actionTypes.ADD_PERSON:
            const newPerson: IPerson = {
                branchId: action.person.branchId,
                userName: action.person.userName,
                password: action.person.password,
                firstName: action.person.firstName,
                middleName: action.person.middleName,
                lastName: action.person.lastName,
                position: action.person.position,
            }
            return {
                ...state,
                persons: state.persons.concat(newPerson),
            }
        case actionTypes.REMOVE_PERSON:
            const updatedPerson: IPerson[] = state.persons.filter(
                person => person.branchId !== action.person.branchId
            )
            return {
                ...state,
                persons: updatedPerson,
            }
        case actionTypes.ADD_USER:
            const newUser: IPerson = {
                branchId: action.person.branchId,
                userName: action.person.userName,
                password: action.person.password,
                firstName: action.person.firstName,
                middleName: action.person.middleName,
                lastName: action.person.lastName,
                position: action.person.position,
            }
            return {
                ...state,
                user: newUser,
            }
        case actionTypes.REMOVE_USER:
            const updatedUser: IPerson = state.user = userEmpty
            return {
                persons: state.persons,
                user: userEmpty,
            }
    }
    return state
}

export default reducer
