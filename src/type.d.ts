interface IPerson {
    branchId?: number,
    userName?: string,
    password?: string,
    firstName?: string ,
    middleName?: string,
    lastName?: string,
    position?: string,
};
/*
interface IUser{
    branchId: number,
    userName: string,
    password: string,
}*/

type PersonState = {
    persons: IPerson[],
    user: IPerson
}

type PersonAction = {
    type: string
    person: IPerson
}

/*type UserAction = {
    type: string
    user: IUser
}*/

interface IUserField {
    branchId: { value: number },
    userName: { value: string },
    password: { value: string },
}
interface IPersonField {
    branchId: { value: number },
    userName: { value: string },
    password: { value: string },
    firstName: { value: string },
    middleName: { value: string },
    lastName: { value: string },
    position: { value: string },
};


type DispatchType = (args: PersonAction) => PersonAction

