import React from "react";
import { Navigate  } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux"
import { PersonList } from "../Persons/PersonList"
import Navbar from "../Navbar/Navbar";



export default function Dashboard() {
    const persons: readonly IPerson[] = useSelector(
        (state: PersonState) => state.persons,
        shallowEqual
    )
    const user: IPerson = useSelector(
        (state: PersonState) => state.user,
        shallowEqual
    )

    if (!user.branchId){
        return <Navigate to="/login" replace={true} />
    }

    return (
        <div className="App">
            <Navbar />
            <PersonList />
        </div>
    )
}
