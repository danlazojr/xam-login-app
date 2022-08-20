import * as actionTypes from "./actionTypes"

export function addPerson(person: IPerson) {
    const action: PersonAction = {
        type: actionTypes.ADD_PERSON,
        person,
    }

    return simulateHttpRequest(action)
}

export function addUser(person: IPerson) {
    const action: PersonAction = {
        type: actionTypes.ADD_USER,
        person,
    }

    return simulateHttpRequest(action)
}

export function removeUser(person: IPerson) {
    const action: PersonAction = {
        type: actionTypes.REMOVE_USER,
        person,
    }

    return simulateHttpRequest(action)
}

export function removePerson(person: IPerson) {
    const action: PersonAction = {
        type: actionTypes.REMOVE_PERSON,
        person,
    }
    return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: PersonAction) {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 500)
    }
}
